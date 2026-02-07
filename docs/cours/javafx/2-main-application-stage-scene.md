# La classe Main, la classe Application, les stages et les Scenes

Dans JavaFX, la structure d'une application graphique repose sur quelques concepts clés. Bien comprendre ces notions est essentiel pour organiser et développer des interfaces robustes et évolutives.

- **Application** : la classe de base de toute application JavaFX. Elle gère le cycle de vie de l'application (initialisation, démarrage, arrêt).
- **Stage** : représente une fenêtre de l'application. On peut en avoir plusieurs (ex : fenêtre principale, boîtes de dialogue).
- **Scene** : représente le contenu affiché dans une fenêtre (`Stage`). On peut changer la scène d'un stage à tout moment.
- **Node** : tout élément graphique (bouton, texte, forme, conteneur, etc.) est un `Node`. Les nodes forment un arbre hiérarchique.

::: info
Pense à la hiérarchie suivante : **Application** > **Stage** (fenêtre) > **Scene** (contenu) > **Node** (éléments graphiques). C'est la base de toute interface JavaFX.
:::

## Différence entre `Application`, `Stage`, `Scene` et `Node`

- L'application (`Application`) contient toutes les fenêtres.
- Le stage (`Stage`) est une fenêtre.
- La scène (`Scene`) est le contenu d'une fenêtre.
- Les éléments graphiques (boutons, labels, etc.) sont des `Node`.

![Hiérarchie des noeuds JavaFX](https://amyfowlersblog.files.wordpress.com/2011/06/javafx2-0layoutclasses.png)

::: warning
Le layout manager (gestionnaire de disposition) utilisé dans la scène influence la manière dont les éléments sont redimensionnés. Par exemple, un `VBox` ou un `GridPane` ne gèrent pas la taille de leurs enfants de la même façon.
:::

## La méthode `launch`

La méthode statique `launch()` de la classe `Application` démarre l'application JavaFX et crée le thread graphique. Elle appelle automatiquement la méthode `start()`.

```java
public class Main extends Application {
    public static void main(String[] args) {
        launch(args); // Démarre l'application JavaFX
    }
}
```

**Explication :**
- `launch(args)` initialise l'environnement JavaFX et appelle la méthode `start()`.
- La classe doit hériter de `Application` pour fonctionner.

## La méthode `start`

La méthode `start(Stage primaryStage)` doit être redéfinie. C'est ici que tu configures la fenêtre principale et son contenu (titre, taille, scène, etc.).

```java
@Override
public void start(Stage primaryStage) throws Exception {
    primaryStage.setTitle("Hello World"); // Définit le titre de la fenêtre
    primaryStage.show(); // Affiche la fenêtre
}
```

**Explication :**
- `primaryStage` est la fenêtre principale de l'application.
- On peut y attacher une scène (`primaryStage.setScene(...)`), définir son titre, sa taille, etc.
- On peut créer d'autres stages pour afficher des fenêtres secondaires.

::: info
Le paramètre `primaryStage` est la fenêtre principale de l'application. Tu peux en créer d'autres si besoin (pour des boîtes de dialogue, des popups, etc.).
:::

::: tip
La méthode `start` est le point d'entrée graphique de toute application JavaFX. C'est ici que commence la vie de l'interface !
:::
