# Première approche de l'architecture MVC

Dans cette section, nous allons voir concrètement comment appliquer le modèle MVC à un petit projet Java. L'objectif est de bien comprendre la séparation des rôles et la circulation de l'information entre les différentes parties.

::: info
Commencez toujours par un exemple simple pour bien saisir la logique du découpage MVC avant de passer à des applications plus complexes.
:::

## Exemple simple : gestion d'une personne

Imaginons que nous voulons gérer l'affichage d'une personne (nom, prénom, âge) dans une application console. Voici comment on peut organiser le code selon le modèle MVC.

### Le modèle

Le modèle représente les données et la logique métier. Ici, il s'agit simplement d'une classe `Personne` qui stocke les informations d'une personne.

```java
public class Personne {
    private String nom;
    private String prenom;
    private int age;
    // ...
}
```

::: tip
À retenir : Le modèle ne s'occupe ni de l'affichage, ni de la gestion des interactions utilisateur.
:::

### La vue (console)

La vue est responsable de l'affichage des données du modèle à l'utilisateur. Elle ne modifie pas directement les données : elle se contente de les présenter.

```java
public class PersonneViewConsole {
    private Personne model;
    public PersonneViewConsole(Personne model) {
        this.model = model;
    }
    public void afficher() {
        System.out.println("Nom : " + model.getNom());
        System.out.println("Prénom : " + model.getPrenom());
        System.out.println("Age : " + model.getAge());
    }
}
```


::: info
On peut facilement créer d'autres vues (ex : graphique, web) qui utilisent le même modèle !
:::

### Le contrôleur (application)

Le contrôleur est le chef d'orchestre : il crée le modèle, la vue, et gère les interactions. Dans une application console, il peut simplement instancier les objets et déclencher l'affichage.

```java
public class Main {
    public static void main(String[] args) {
        Personne personne = new Personne("Alice", "Dupont", 30);
        PersonneViewConsole vue = new PersonneViewConsole(personne);
        vue.afficher();
    }
}
```

::: tip
À retenir : Le contrôleur relie le modèle et la vue, mais ne fait ni l'affichage, ni la gestion des données lui-même.
:::

---

Ce découpage simple permet déjà de voir les bénéfices du MVC : chaque classe a un rôle clair, le code est plus lisible et plus facile à faire évoluer.
