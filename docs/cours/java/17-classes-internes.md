# Classes internes

Les classes internes sont un mécanisme de Java permettant de définir une classe à l’intérieur d’une autre. Elles sont très utiles pour structurer le code, encapsuler des comportements spécifiques et renforcer l’organisation et la sécurité des données.

::: tip À retenir
Une classe interne est une classe déclarée à l’intérieur d’une autre classe. Elle peut accéder directement aux membres (même privés) de la classe englobante.
:::

## Vous avez dit classes internes ?!

En Java, il est possible de définir une classe à l’intérieur d’une autre classe. On parle alors de « classe interne ». Cette classe interne est liée à l’instance de la classe englobante, ce qui lui permet d’accéder à tous ses attributs et méthodes, même privés.

::: info
Les classes internes sont souvent utilisées pour modéliser une relation « fait partie de » (ex : une classe `Adresse` interne à une classe `Personne`).
:::

## À quoi ça sert ?!

Les classes internes permettent :
- D’encapsuler des comportements ou des données qui n’ont de sens qu’au sein de la classe englobante.
- De simplifier l’accès aux membres privés de la classe englobante.
- De structurer le code en regroupant des éléments fortement liés.

### Exemple :

```java
public class Externe {
    private int x = 10;
    class Interne {
        void afficher() {
            System.out.println(x); // Accès direct à l’attribut privé de Externe
        }
    }
    void test() {
        Interne i = new Interne();
        i.afficher();
    }
}
```

Dans cet exemple, la classe `Interne` peut accéder à l’attribut privé `x` de la classe `Externe`.

::: tip Important
- Pour instancier une classe interne, il faut d’abord avoir une instance de la classe englobante.
- Les classes internes peuvent être privées, publiques, protégées ou package-private.
:::

## Exemple concret : Personne et Adresse

Prenons un exemple où une classe interne a du sens : modéliser une personne et son adresse. L’adresse n’a de sens que dans le contexte d’une personne, on peut donc la définir comme classe interne.

```java
public class Personne {
    private String nom;
    private String prenom;
    private Adresse adresse;

    public Personne(String nom, String prenom, String rue, int numero) {
        this.nom = nom;
        this.prenom = prenom;
        this.adresse = new Adresse(rue, numero);
    }

    public String getNomComplet() {
        return prenom + " " + nom;
    }

    // Classe interne
    class Adresse {
        private String rue;
        private int numero;

        public Adresse(String rue, int numero) {
            this.rue = rue;
            this.numero = numero;
        }

        @Override
        public String toString() {
            // On peut accéder à getNomComplet() de Personne !
            return getNomComplet() + ", " + numero + " " + rue;
        }
    }

    public void afficherAdresse() {
        System.out.println(adresse);
    }
}

public class Main {
    public static void main(String[] args) {
        Personne p = new Personne("Dupont", "Jean", "rue de la Paix", 5);
        p.afficherAdresse(); // Affiche : Jean Dupont, 5 rue de la Paix
    }
}
```

::: tip À retenir
- La classe interne `Adresse` peut accéder aux méthodes et attributs de `Personne`.
- On ne peut pas utiliser `Adresse` sans une instance de `Personne`.
- Cela permet de bien encapsuler l’information et d’éviter la dispersion de classes inutiles dans le projet.
:::

## Les classes internes statiques

En plus des classes internes « classiques » (liées à une instance), Java permet de définir des classes internes statiques. On les déclare avec le mot-clé `static` :

::: info Définition
Une classe interne statique est une classe imbriquée qui n’est pas liée à une instance de la classe englobante. Elle fonctionne comme une classe « normale », mais reste rangée à l’intérieur d’une autre classe pour des raisons d’organisation ou de logique métier.
:::

### Différences entre classe interne statique et non statique

| Classe interne non statique         | Classe interne statique                |
|-------------------------------------|----------------------------------------|
| Liée à une instance de la classe    | Liée à la classe, pas à une instance   |
| Peut accéder aux membres de l’instance englobante | Ne peut accéder qu’aux membres statiques de la classe englobante |
| S’instancie via une instance        | S’instancie sans instance              |
| Syntaxe : `Externe.Interne` via une instance | Syntaxe : `Externe.InterneStatique` directement |

::: info
Utilisez une classe interne statique si votre classe interne n’a pas besoin d’accéder à l’instance de la classe englobante. Cela permet d’éviter les références implicites inutiles et de clarifier l’intention du code.
:::

### Exemple réel : classe interne statique pour une structure de données

Un usage courant des classes internes statiques est la création de structures utilitaires, comme un « Pair » (paire de valeurs) dans une classe de gestion de dictionnaire :

```java
import java.util.ArrayList;
import java.util.List;

public class Dictionnaire {
    // Classe interne statique pour représenter une paire clé/valeur
    public static class Pair {
        private final String key;
        private final String value;
        public Pair(String key, String value) {
            this.key = key;
            this.value = value;
        }
        public String getKey() { return key; }
        public String getValue() { return value; }
    }

    private List<Pair> entries = new ArrayList<>();

    public void ajouter(String key, String value) {
        entries.add(new Pair(key, value));
    }
    public String chercher(String key) {
        for (Pair p : entries) {
            if (p.getKey().equals(key)) return p.getValue();
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        Dictionnaire d = new Dictionnaire();
        d.ajouter("chien", "dog");
        d.ajouter("chat", "cat");
        System.out.println(d.chercher("chien")); // Affiche : dog
    }
}
```

::: tip À retenir
- La classe interne statique `Pair` est utilisée uniquement par `Dictionnaire` et n’a pas besoin d’accéder à l’instance de `Dictionnaire`.
- Cela permet de bien organiser le code et d’éviter de polluer l’espace de noms global avec des classes utilitaires.
:::

---

## Bonnes pratiques et limites

- Privilégiez les classes internes pour encapsuler des comportements ou des données qui n’ont de sens qu’au sein de la classe englobante.
- Utilisez la version statique si la classe interne n’a pas besoin d’accéder à l’instance de la classe principale.
- Évitez de multiplier les niveaux d’imbrication, cela peut nuire à la lisibilité.

::: tip À tester
Essayez de créer une classe interne privée, protégée ou package-private, et observez l’impact sur la visibilité depuis l’extérieur.
:::

---

*Les classes internes sont un outil puissant pour structurer et encapsuler votre code, à utiliser avec discernement pour garder vos programmes clairs et maintenables !*
