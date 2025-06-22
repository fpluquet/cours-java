# Découper une interface JavaFX en plusieurs FXML et contrôleurs spécialisés

Pour les applications JavaFX complexes, il est recommandé de structurer l’interface en plusieurs fichiers FXML, chacun associé à un contrôleur dédié. Cela permet de mieux organiser le code, de réutiliser des composants, et de faciliter la maintenance.

## Pourquoi découper en plusieurs FXML ?
- **Lisibilité** : chaque partie de l’interface a son propre fichier, plus facile à lire et à modifier.
- **Réutilisabilité** : on peut réutiliser un même composant (ex : une barre de navigation) dans plusieurs vues.
- **Modularité** : chaque contrôleur gère une seule responsabilité, ce qui simplifie le code.
- **Travail en équipe** : plusieurs personnes peuvent travailler sur différentes parties de l’UI sans conflit.

## Exemple de découpage
Imaginons une application avec :
- Un menu principal
- Une barre latérale
- Un contenu central

On crée :
- `MainView.fxml` (structure globale, type BorderPane)
- `MenuBar.fxml` (menu du haut)
- `Sidebar.fxml` (barre latérale)
- `Content.fxml` (zone centrale)

## Étapes détaillées

### 1. Créer les fichiers FXML
- `MainView.fxml` :
```xml
<BorderPane fx:controller="app.MainController" ...>
    <top>
        <fx:include source="MenuBar.fxml" />
    </top>
    <left>
        <fx:include source="Sidebar.fxml" />
    </left>
    <center>
        <fx:include source="Content.fxml" />
    </center>
</BorderPane>
```
- `MenuBar.fxml`, `Sidebar.fxml`, `Content.fxml` : chaque fichier décrit sa partie de l’UI et peut avoir son propre contrôleur.

### 2. Associer un contrôleur à chaque FXML
- `MenuBar.fxml` → `MenuBarController.java`
- `Sidebar.fxml` → `SidebarController.java`
- `Content.fxml` → `ContentController.java`

Dans chaque FXML, ajouter l’attribut `fx:controller` correspondant.

### 3. Utiliser `<fx:include>` pour l’assemblage
L’élément `<fx:include>` permet d’inclure un autre fichier FXML dans un FXML principal. Les contrôleurs de chaque sous-vue sont instanciés automatiquement.

### 4. Communication entre contrôleurs
Pour faire communiquer les contrôleurs (ex : le menu déclenche une action dans le contenu), plusieurs solutions :
- Passer une référence du contrôleur parent aux enfants via des méthodes publiques ou l’injection.
- Utiliser un modèle partagé (pattern Observer, propriétés JavaFX, etc.).
- Utiliser des événements personnalisés.

**Exemple :**
Dans le contrôleur principal :
```java
@FXML private SidebarController sidebarController;
@FXML private ContentController contentController;

@FXML
public void initialize() {
    sidebarController.setContentController(contentController);
}
```

::: info
Pour que l’injection de sous-contrôleurs fonctionne, il faut donner un `fx:id` à la balise `<fx:include>` dans le FXML parent.
:::

### 5. Tester et maintenir
- Chaque composant peut être testé séparément.
- Les modifications dans un sous-FXML n’impactent pas les autres parties de l’UI.

## À retenir
Découper une interface en plusieurs FXML et contrôleurs spécialisés permet de gagner en clarté, en modularité et en maintenabilité. C’est une bonne pratique pour tout projet JavaFX de taille moyenne à grande.
