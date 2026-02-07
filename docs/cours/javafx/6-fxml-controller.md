# Le contrôleur FXML

Le contrôleur FXML est une classe Java qui fait le lien entre l'interface décrite en FXML (le fichier XML qui structure l'UI) et la logique métier de ton application. Il permet de gérer les événements (clics, saisies, etc.), de manipuler les éléments graphiques définis dans le fichier FXML, et d'assurer la communication entre l'interface et le code Java.

## Pourquoi utiliser un contrôleur FXML ?

Le contrôleur FXML permet :
- De séparer la structure de l’interface (décrite en FXML) de la logique métier (en Java).
- De rendre le code plus lisible, modulaire et maintenable.
- De faciliter le travail en équipe (un développeur peut travailler sur l’UI, un autre sur la logique).
- D’associer facilement des événements (clics, saisies, etc.) à des méthodes Java.

::: info
Un bon découpage FXML/contrôleur permet de réutiliser des interfaces et de tester la logique métier indépendamment de l’UI.
:::

## Cycle de vie d’un contrôleur FXML

1. **Chargement du FXML** : JavaFX lit le fichier FXML et instancie tous les composants graphiques.
2. **Création du contrôleur** : JavaFX crée une instance de la classe contrôleur (définie par `fx:controller`).
3. **Injection des éléments** : Les champs annotés `@FXML` sont automatiquement reliés aux éléments du FXML ayant le même `fx:id`.
4. **Appel de la méthode `initialize()`** : Si le contrôleur implémente `Initializable` ou possède une méthode `initialize()`, celle-ci est appelée après l’injection des éléments. C’est le bon endroit pour initialiser l’interface.

## Déclaration du contrôleur dans le FXML

Dans le fichier FXML, on indique le contrôleur avec l'attribut `fx:controller` sur la balise racine (par exemple `<AnchorPane fx:controller="com.example.MyController">`). Cela permet à JavaFX de savoir quelle classe Java doit être associée à ce fichier FXML.

::: info
Le nom de la classe doit être complet (avec le package) et la classe doit avoir un constructeur sans paramètre (c'est le cas par défaut si tu ne déclares pas de constructeur).
:::

## Liaison des éléments FXML et du contrôleur

Pour accéder à un élément défini dans le FXML, on lui donne un attribut `fx:id` dans le fichier FXML, puis on déclare un champ annoté `@FXML` dans le contrôleur Java. Cela permet de manipuler cet élément directement dans le code.

```java
public class MyController implements Initializable {
    @FXML
    private Button myButton;
    @Override
    public void initialize(URL url, ResourceBundle resourceBundle) {
        myButton.setText("Hello");
    }
    void setButtonText(String text) {
        myButton.setText(text);
    }
}
```

**Explication :**
- L'attribut `fx:id` dans le FXML doit correspondre au nom du champ annoté `@FXML` dans le contrôleur.
- La méthode `initialize` (appelée automatiquement) permet d'initialiser les éléments de l'interface après leur création.
- On peut ajouter des méthodes utilitaires pour manipuler les éléments depuis d'autres classes.

## Récupérer le contrôleur depuis le code Java

Il est parfois utile de récupérer une référence au contrôleur pour interagir avec l'interface après le chargement du FXML.

```java
FXMLLoader loader = new FXMLLoader(getClass().getResource("myfxml.fxml"));
Parent root = loader.load();
MyController controller = loader.getController();
controller.setButtonText("Bonjour !");
```

**Explication :**
- On charge le FXML avec un `FXMLLoader`.
- On récupère le contrôleur associé avec `getController()` pour appeler ses méthodes depuis le code Java.
- Cela permet de modifier l’interface ou de transmettre des données au contrôleur après le chargement.

## Gérer les événements dans le contrôleur

On peut ajouter des méthodes annotées `@FXML` pour réagir aux événements (ex : clic sur un bouton). Ces méthodes peuvent être référencées directement dans le FXML.

```java
@FXML
void onButtonClicked() {
    System.out.println("Button clicked !");
}
```

Dans le FXML :
```xml
<Button fx:id="myButton" onAction="#onButtonClicked" text="Click me !" />
```

**Explication :**
- L'attribut `onAction="#onButtonClicked"` indique à JavaFX d'appeler la méthode `onButtonClicked` du contrôleur lors d'un clic sur le bouton.
- La méthode doit être annotée `@FXML` et avoir le bon nom.

## Bonnes pratiques et astuces

- **Toujours annoter** les champs et méthodes utilisés par le FXML avec `@FXML` (même s’ils sont `private`).
- **Ne pas mettre de logique métier complexe** dans le contrôleur : privilégier des appels à des services ou des classes métier.
- **Utiliser `initialize()`** pour toute initialisation dépendant de l’UI (et non le constructeur).
- **Préférer l’injection de dépendances** (via setters ou méthodes publiques) pour transmettre des données au contrôleur après le chargement.
- **Documenter** les méthodes référencées dans le FXML pour faciliter la maintenance.

::: info
Un contrôleur bien conçu est simple, lisible, et ne fait que le lien entre l’UI et la logique métier.
:::

## Aller plus loin

::: tip
Le contrôleur FXML est la clé d’une architecture propre, modulaire et maintenable en JavaFX. Il permet de séparer l’UI de la logique, de gérer les événements et de rendre le code plus professionnel.
:::
