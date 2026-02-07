# FXML et interfaces déclaratives en JavaFX

JavaFX permet de séparer la structure de l’interface graphique du code Java grâce à FXML, un langage basé sur XML. Cela facilite la maintenance, la réutilisation et la collaboration entre développeurs et designers.

## Pourquoi utiliser FXML ?
- **Lisibilité** : L’interface est décrite dans un fichier texte, facile à lire et à modifier.
- **Séparation des rôles** : Le développeur Java s’occupe de la logique, le designer de l’interface.
- **Productivité** : On peut utiliser des outils visuels comme SceneBuilder pour créer l’interface sans écrire de code Java.

## Qu’est-ce que FXML ?
FXML est un format XML spécifique à JavaFX. Il permet de décrire la hiérarchie des composants (boutons, champs, conteneurs, etc.) dans un fichier `.fxml`.

**Exemple de fichier FXML simple :**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>
<AnchorPane xmlns:fx="http://javafx.com/fxml">
    <children>
        <Button text="Cliquez-moi !" layoutX="100" layoutY="80" />
        <TextField layoutX="100" layoutY="120" />
    </children>
</AnchorPane>
```

Dans cet exemple, on décrit une interface avec un bouton et un champ de texte, placés dans un `AnchorPane`.

## Comment lier FXML et Java ?
Pour relier le fichier FXML à votre code Java, on utilise la classe `FXMLLoader` :
```java
AnchorPane root = FXMLLoader.load(getClass().getResource("monfichier.fxml"));
Scene scene = new Scene(root);
primaryStage.setScene(scene);
primaryStage.show();
```

## Problème courant : "Location is not defined"

Si vous obtenez une erreur du type :
```
javafx.fxml.LoadException: ... Location is not defined
```
cela signifie que le fichier FXML n'a pas été trouvé à l'emplacement indiqué dans votre code Java.

Le `getResource("monfichier.fxml")` doit pointer vers le bon chemin du fichier FXML dans votre projet. Java va commencer à chercher dans le dossier de ressources du package de la classe pointée (`getClass()`). Si nous sommes dans le classe `Main` du package `org.example`, Java cherchera dans le fichier `src/main/resources/org/example/monfichier.xml`.

**Vérifiez que :**
- Le chemin passé à `FXMLLoader.load(getClass().getResource("monfichier.fxml"))` est correct et respecte la casse.
- Le fichier FXML est bien dans le dossier de ressources de votre projet (souvent `src/main/resources` ou à la racine du classpath).
- Le nom du fichier et son extension sont corrects.

::: tip
Si le fichier FXML est dans un sous-dossier, indiquez le chemin relatif, par exemple : `"/fxml/monfichier.fxml"`.
:::

## Utiliser SceneBuilder
SceneBuilder est un éditeur graphique qui permet de créer des interfaces FXML par glisser-déposer. Il génère le fichier FXML automatiquement, que l’on peut ensuite charger dans son application JavaFX.

## Résumé
- FXML = structure de l’interface en XML
- Contrôleur Java = logique de l’application
- FXMLLoader = fait le lien entre les deux
- SceneBuilder = outil visuel pour créer du FXML

::: tip
Utiliser FXML rend vos interfaces plus modulaires, maintenables et collaboratives !
:::
