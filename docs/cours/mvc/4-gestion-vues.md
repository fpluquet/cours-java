# Gestion de différentes vues dans MVC

L'architecture MVC ne se limite pas à afficher des données : elle permet aussi de gérer plusieurs vues (lecture, édition, etc.) de façon propre et découplée. Cette capacité est essentielle pour faire évoluer une application sans tout réécrire.

::: info
Plus vos vues sont découplées, plus il est facile d'ajouter de nouvelles interfaces (console, web, mobile) ou de faire évoluer l'existant !
:::

## Exemple : affichage et édition d'un modèle

On peut avoir une vue pour l'affichage (lecture seule) et une autre pour l'édition (modification des données), toutes deux connectées au même modèle. Cela permet de réutiliser la logique métier sans dupliquer le code.

### 1. Vue d'édition (JavaFX)

La vue d'édition permet à l'utilisateur de modifier les données du modèle. Elle ne modifie jamais directement le modèle : elle délègue toute action à un listener (souvent le contrôleur d'application).

```xml
<AnchorPane xmlns="http://javafx.com/javafx/17" xmlns:fx="http://javafx.com/fxml/1" fx:controller="views.PersonneEditViewController">
   <children>
      <GridPane>
        <!-- ...voir le code complet dans le cours principal... -->
      </GridPane>
   </children>
</AnchorPane>
```

Le contrôleur associé :

```java
public class PersonneEditViewController implements Initializable {
    @FXML private TextField nomTextField;
    @FXML private TextField prenomTextField;
    @FXML private TextField ageTextField;
    @FXML private Button sauverButton;
    @FXML private Button annulerButton;
    private Personne personne;
    private PersonneEditViewListener listener;

    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        sauverButton.setOnAction(event -> sauver());
        annulerButton.setOnAction(event -> annuler());
    }
    public void setPersonne(Personne personne) {
        this.personne = personne;
        nomTextField.setText(personne.getNom());
        prenomTextField.setText(personne.getPrenom());
        ageTextField.setText(String.valueOf(personne.getAge()));
    }
    public void sauver() {
        if(listener != null) {
            listener.sauver(personne, nomTextField.getText(), prenomTextField.getText(), Integer.parseInt(ageTextField.getText()));
        }
    }
    public void annuler() {
        if(listener != null) {
            listener.annuler(personne);
        }
    }
    public void setListener(PersonneEditViewListener listener) {
        this.listener = listener;
    }
    public interface PersonneEditViewListener {
        void sauver(Personne personne, String nom, String prenom, int age);
        void annuler(Personne personne);
    }
}
```

::: tip
À retenir : La vue ne gère que l'affichage et la collecte des données utilisateur. Toute modification du modèle passe par le listener.
:::

### 2. Contrôleur d'application (gestion des interactions)

Le contrôleur d'application reçoit les demandes de la vue et applique les modifications au modèle. Il peut aussi afficher des messages de confirmation ou mettre à jour d'autres vues.

```java
public class PersonneApplication extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        Personne personne = new Personne("John", "Doe", 42);
        FXMLLoader fxmlLoader = new FXMLLoader(PersonneEditViewController.class.getResource("personne-edit-view.fxml"));
        Parent root = fxmlLoader.load();
        PersonneEditViewController personneEditViewController = fxmlLoader.getController();
        personneEditViewController.setPersonne(personne);
        personneEditViewController.setListener(new PersonneEditViewController.PersonneEditViewListener() {
            @Override
            public void sauver(Personne personne, String nom, String prenom, int age) {
                personne.setNom(nom);
                personne.setPrenom(prenom);
                personne.setAge(age);
                // Affichage d'une alerte ou mise à jour d'une autre vue
            }
            @Override
            public void annuler(Personne personne) {
                personneEditViewController.setPersonne(personne);
            }
        });
        Scene scene = new Scene(root, 320, 240);
        stage.setTitle("Edition Personne");
        stage.setScene(scene);
        stage.show();
    }
    public static void main(String[] args) {
        launch();
    }
}
```

::: info
Ce découplage permet de réutiliser la vue dans d'autres contextes, ou de la tester indépendamment du reste de l'application.
:::

## Pourquoi ce découplage ?

Si la vue dépendait directement du contrôleur d'application, elle ne pourrait pas être réutilisée ailleurs. En passant par une interface (listener), on rend la vue indépendante et réutilisable.

Ce principe est fondamental pour la maintenabilité et l'évolutivité des applications modernes.

::: tip
Le découplage est la clé pour faire évoluer une application sans tout casser.
:::

---

En résumé, la gestion de différentes vues dans MVC repose sur le découplage : chaque vue se concentre sur l'affichage et délègue les actions, ce qui permet de garder un code propre, modulaire et réutilisable. Cette approche est valable aussi bien pour des applications JavaFX que pour des applications web ou mobiles.
