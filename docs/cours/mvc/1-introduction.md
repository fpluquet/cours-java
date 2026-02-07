# Introduction à l'architecture MVC

L'architecture **MVC** (Modèle-Vue-Contrôleur) est un pilier de la conception logicielle moderne. Elle vise à séparer les différentes responsabilités d'une application pour la rendre plus claire, plus robuste et plus facile à faire évoluer.

::: info
MVC n'est pas réservé aux grandes applications ! Même pour de petits projets, réfléchir à la séparation des rôles aide à prendre de bonnes habitudes de code.
:::

![Architecture](/images/Model-View-Controller_architectural_pattern-fr.svg)

## Pourquoi utiliser MVC ?
- Pour mieux organiser le code
- Pour faciliter la maintenance et la réutilisation
- Pour permettre à plusieurs personnes de travailler ensemble (ex : un développeur sur la logique, un autre sur l'interface)

Dans ce dossier, nous allons explorer les trois composants principaux du MVC :
- **Modèle** : gère les données et la logique métier
- **Vue** : gère l'affichage et l'interface utilisateur
- **Contrôleur** : fait le lien entre le modèle et la vue, gère les interactions

Nous verrons aussi comment cette architecture améliore la qualité du code grâce au découplage et à la cohésion.

---

## Le modèle

Le **modèle** est le cœur de l'application : il représente les données et la logique métier. Il ne s'occupe ni de l'affichage, ni de la gestion des interactions utilisateur.

::: warning
Le modèle doit être indépendant de l'interface graphique. Cela permet de le réutiliser ou de le tester facilement.
:::

Exemple simple en Java :

```java
public class Personne {
    private String nom;
    private String prenom;
    private int age;

    public Personne(String nom, String prenom, int age) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
    }

    // Getters et setters
    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }
    public String getPrenom() { return prenom; }
    public void setPrenom(String prenom) { this.prenom = prenom; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
}
```

Le modèle ne doit pas contenir de code d'affichage ou de gestion d'événements : il se concentre uniquement sur les données et leur manipulation.

---

## La vue

La **vue** est responsable de l'affichage des données du modèle à l'utilisateur. Elle ne modifie pas directement les données : elle se contente de les présenter.

::: info
On peut avoir plusieurs vues pour un même modèle (ex : une vue console, une vue graphique, une vue web...)
:::

Exemple console en Java :

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

En JavaFX, la vue est souvent composée d'un fichier FXML (structure de l'interface) et d'un contrôleur de vue (classe Java qui gère l'affichage).

::: danger
La vue ne doit pas contenir de logique métier (calculs, gestion des données, etc.)
:::

---

## Le contrôleur

Le **contrôleur** fait le lien entre le modèle et la vue. Il gère les interactions de l'utilisateur, met à jour le modèle et demande à la vue de se mettre à jour.

::: warning
Le contrôleur orchestre l'application : il reçoit les actions de l'utilisateur, modifie le modèle, puis demande à la vue de s'actualiser.
:::

Exemple JavaFX :

```java
import models.Personne;
import views.PersonneViewController;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class PersonneApplication extends Application {
    @Override
    public void start(Stage stage) throws Exception {
        Personne personne = new Personne("John", "Doe", 42);
        FXMLLoader fxmlLoader = new FXMLLoader(PersonneViewController.class.getResource("personne-view.fxml"));
        Parent root = fxmlLoader.load();
        PersonneViewController personneViewController = fxmlLoader.getController();
        personneViewController.setPersonne(personne);
        Scene scene = new Scene(root, 320, 240);
        stage.setTitle("Personne");
        stage.setScene(scene);
        stage.show();
    }
    public static void main(String[] args) {
        launch();
    }
}
```

---

## Avantages de l'architecture MVC

L'architecture MVC permet de séparer les différentes responsabilités de l'application. Cela permet de mieux organiser le code et de mieux le maintenir.

- Séparation claire des responsabilités (modèle, vue, contrôleur)
- Facilite la maintenance et l'évolution du code
- Permet de réutiliser les vues ou les modèles indépendamment
- Favorise le travail en équipe (développeurs backend/frontend)
- Améliore la testabilité du code

::: tip
Plus le découpage est clair, plus il est facile de faire évoluer l'application sans tout casser !
:::

---

## Inconvénients de l'architecture MVC

- Peut sembler complexe à mettre en place pour de petits projets
- Nécessite une bonne compréhension de la séparation des responsabilités
- Parfois plus de fichiers/classes à gérer
- Peut entraîner une sur-ingénierie si mal appliqué

::: tip
Pour les petits projets, il est possible de simplifier le schéma MVC, mais il reste utile de garder la séparation des rôles en tête.
:::
