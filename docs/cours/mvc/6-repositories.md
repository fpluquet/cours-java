# Les repositories dans l'architecture MVC

Dans les applications qui manipulent des données persistantes (fichiers, bases de données, API...), on ajoute souvent une couche de **repositories** (ou dépôts) à l'architecture MVC. Cette couche permet de mieux organiser le code et de séparer les responsabilités.

::: info
Un repository est comme un « magasin » où l'on va chercher ou stocker les objets du modèle, sans se soucier de la façon dont ils sont réellement stockés.
:::

## Qu'est-ce qu'un repository ?
Un repository est une classe qui gère l'accès aux données : lecture, écriture, recherche, suppression, etc. Il fait le lien entre le modèle et la source de données (base de données, fichier, API...).

- Il encapsule toute la logique d'accès aux données.
- Il permet de changer de technologie de stockage sans impacter le reste de l'application.
- Il rend le code plus testable (on peut remplacer un repository réel par un faux en mémoire pour les tests).

## Pourquoi utiliser des repositories ?
- **Centraliser** la gestion de la persistance des données
- **Séparer** la logique d'accès aux données de la logique métier
- **Faciliter** le changement de technologie de stockage
- **Favoriser** les tests (on peut simuler un repository en mémoire)

::: tip
À retenir : Un bon repository ne fait que de la persistance : il ne contient pas de logique métier.
:::

## Exemple
Voici une interface de repository pour le modèle `Personne` :

```java
public interface PersonneRepository {
    void save(Personne personne);
    Personne findById(int id);
    List<Personne> findAll();
    void delete(Personne personne);
}
```

On pourra ensuite avoir plusieurs implémentations : une pour une base de données, une pour des fichiers, une pour des tests...

## Exemple concret complet : implémentation en mémoire

Voici une implémentation simple d'un repository en mémoire, utile pour les tests ou les petits projets :

```java
import java.util.*;

public class PersonneRepositoryMemoryImpl implements PersonneRepository {
    private Map<Integer, Personne> stockage = new HashMap<>();
    private int nextId = 1;

    @Override
    public void save(Personne personne) {
        if (personne.getId() == 0) {
            personne.setId(nextId++); // On assigne un nouvel id
        }
        stockage.put(personne.getId(), personne);
    }

    @Override
    public Personne findById(int id) {
        return stockage.get(id);
    }

    @Override
    public List<Personne> findAll() {
        return new ArrayList<>(stockage.values());
    }

    @Override
    public void delete(Personne personne) {
        stockage.remove(personne.getId());
    }
}

// Exemple d'utilisation :
public class Main {
    public static void main(String[] args) {
        PersonneRepository repo = new PersonneRepositoryMemoryImpl();
        Personne p1 = new Personne("Alice", "Dupont", 30);
        repo.save(p1);
        System.out.println("ID attribué : " + p1.getId());
        Personne p2 = new Personne("Bob", "Martin", 25);
        repo.save(p2);
        System.out.println("Toutes les personnes : " + repo.findAll());
        repo.delete(p1);
        System.out.println("Après suppression : " + repo.findAll());
    }
}
```

::: info
Cette implémentation en mémoire est idéale pour les tests unitaires ou les prototypes. Pour une vraie application, il suffit d'implémenter l'interface avec une classe qui utilise une base de données ou des fichiers.
:::

## Exemple concret complet : implémentation avec une base de données (JDBC)

Voici une implémentation simple d'un repository qui utilise une base de données SQLite avec JDBC. Cet exemple montre comment enregistrer et retrouver des personnes dans une table SQL.

```java
import java.sql.*;
import java.util.*;

public class PersonneRepositoryJdbcImpl implements PersonneRepository {
    private final Connection connection;

    public PersonneRepositoryJdbcImpl(String dbUrl) throws SQLException {
        this.connection = DriverManager.getConnection(dbUrl);
        // Création de la table si elle n'existe pas
        String sql = "CREATE TABLE IF NOT EXISTS personnes (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, age INTEGER)";
        connection.createStatement().execute(sql);
    }

    @Override
    public void save(Personne personne) {
        try {
            if (personne.getId() == 0) {
                String sql = "INSERT INTO personnes (nom, prenom, age) VALUES (?, ?, ?)";
                PreparedStatement stmt = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                stmt.setString(1, personne.getNom());
                stmt.setString(2, personne.getPrenom());
                stmt.setInt(3, personne.getAge());
                stmt.executeUpdate();
                ResultSet rs = stmt.getGeneratedKeys();
                if (rs.next()) {
                    personne.setId(rs.getInt(1));
                }
            } else {
                String sql = "UPDATE personnes SET nom=?, prenom=?, age=? WHERE id=?";
                PreparedStatement stmt = connection.prepareStatement(sql);
                stmt.setString(1, personne.getNom());
                stmt.setString(2, personne.getPrenom());
                stmt.setInt(3, personne.getAge());
                stmt.setInt(4, personne.getId());
                stmt.executeUpdate();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Personne findById(int id) {
        try {
            String sql = "SELECT * FROM personnes WHERE id=?";
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                return new Personne(rs.getInt("id"), rs.getString("nom"), rs.getString("prenom"), rs.getInt("age"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<Personne> findAll() {
        List<Personne> personnes = new ArrayList<>();
        try {
            String sql = "SELECT * FROM personnes";
            ResultSet rs = connection.createStatement().executeQuery(sql);
            while (rs.next()) {
                personnes.add(new Personne(rs.getInt("id"), rs.getString("nom"), rs.getString("prenom"), rs.getInt("age")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return personnes;
    }

    @Override
    public void delete(Personne personne) {
        try {
            String sql = "DELETE FROM personnes WHERE id=?";
            PreparedStatement stmt = connection.prepareStatement(sql);
            stmt.setInt(1, personne.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

// Exemple d'utilisation :
public class Main {
    public static void main(String[] args) throws Exception {
        PersonneRepository repo = new PersonneRepositoryJdbcImpl("jdbc:sqlite:personnes.db");
        Personne p1 = new Personne("Alice", "Dupont", 30);
        repo.save(p1);
        System.out.println("ID attribué : " + p1.getId());
        Personne p2 = new Personne("Bob", "Martin", 25);
        repo.save(p2);
        System.out.println("Toutes les personnes : " + repo.findAll());
        repo.delete(p1);
        System.out.println("Après suppression : " + repo.findAll());
    }
}

// Classe Personne adaptée pour la persistance
public class Personne {
    private int id;
    private String nom;
    private String prenom;
    private int age;
    public Personne(String nom, String prenom, int age) {
        this(0, nom, prenom, age);
    }
    public Personne(int id, String nom, String prenom, int age) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }
    // getters et setters ...
}
```

::: info
Cette version fonctionne avec SQLite (aucune installation serveur nécessaire, juste le driver JDBC). Pour tester, ajoute la dépendance SQLite JDBC à ton projet.
:::

## Où placer les repositories dans MVC ?
- Les **services** ou **contrôleurs** font appel aux repositories pour accéder aux données
- Les **modèles** ne connaissent pas la persistance (ils ne savent pas s'ils viennent d'une base, d'un fichier, etc.)
- Les **vues** n'appellent jamais directement les repositories

::: info
Utiliser des interfaces pour les repositories permet de changer facilement de technologie (ex : passer d'une base de données à un fichier) sans modifier le reste de l'application.
:::

---

En résumé, la couche repository permet de rendre l'application plus modulaire, plus facile à tester et à faire évoluer. Elle s'intègre parfaitement dans une architecture MVC moderne, en gardant chaque responsabilité bien séparée.
