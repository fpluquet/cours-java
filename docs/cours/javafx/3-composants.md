# Les composants JavaFX

JavaFX propose de nombreux composants graphiques (boutons, champs de texte, listes, tableaux, etc.) pour construire des interfaces riches et interactives. Comprendre ces composants et savoir les manipuler est essentiel pour créer des applications ergonomiques et modernes.

> **Info :**
> Un composant JavaFX est un objet visuel que l’on peut placer, configurer et manipuler dans une fenêtre. Il existe des composants de base (boutons, champs de texte, etc.) et des conteneurs (layouts) pour organiser ces éléments.

## Les boutons

Les boutons permettent à l'utilisateur de déclencher des actions. Ils sont très utilisés pour valider des formulaires, lancer des calculs, ouvrir des fenêtres, etc.

### Création d'un bouton
Pour créer un bouton, il suffit d'instancier la classe `Button` :
```java
Button b = new Button("Test");
```

### Paramétrer une action
Pour réagir à un clic sur le bouton, on utilise un `EventHandler` ou, plus simplement, une expression lambda :
```java
b.setOnAction(new EventHandler<ActionEvent>() {
    @Override
    public void handle(ActionEvent e) {
        System.out.println("Hello");
    }
});
// Ou, plus moderne :
b.setOnAction(event -> System.out.println("Hello"));
```

> **Astuce :**
> Utilise les lambdas pour un code plus lisible et concis !

Pour aller plus loin : [Documentation officielle des boutons JavaFX](https://openjfx.io/javadoc/18/javafx.controls/javafx/scene/control/Button.html)

## Les champs de texte (TextField, PasswordField, TextArea)

Les champs de texte permettent à l'utilisateur de saisir des informations. Il existe plusieurs variantes selon le besoin :
- **TextField** : Champ de saisie sur une seule ligne (ex : nom, email).
- **PasswordField** : Champ de saisie masquée (mot de passe).
- **TextArea** : Zone de texte multiligne (ex : message, commentaire).

```java
TextField tf = new TextField();
tf.setPromptText("Entrez votre nom");
PasswordField pf = new PasswordField();
pf.setPromptText("Mot de passe");
TextArea ta = new TextArea();
ta.setPromptText("Votre message");
```

> **Astuce :**
> Utilise `setPromptText` pour afficher un texte d'aide dans le champ.

## Les cases à cocher et boutons radio

Ces composants permettent de faire des choix simples ou exclusifs.
- **CheckBox** : Case à cocher (vrai/faux).
- **RadioButton** : Bouton radio (choix unique dans un groupe).

```java
CheckBox cb = new CheckBox("J'accepte les conditions");
RadioButton rb1 = new RadioButton("Option 1");
RadioButton rb2 = new RadioButton("Option 2");
ToggleGroup group = new ToggleGroup();
rb1.setToggleGroup(group);
rb2.setToggleGroup(group);
```

> **Astuce :**
> Les boutons radio doivent être regroupés avec `ToggleGroup` pour garantir qu'un seul soit sélectionné.

## Les listes et menus déroulants

Pour proposer un choix parmi plusieurs valeurs :
- **ComboBox** : Menu déroulant avec sélection unique.
- **ChoiceBox** : Menu déroulant simple.
- **ListView** : Liste d’éléments sélectionnables (simple ou multiple).

```java
ComboBox<String> combo = new ComboBox<>();
combo.getItems().addAll("A", "B", "C");
ChoiceBox<String> choice = new ChoiceBox<>();
choice.getItems().addAll("X", "Y", "Z");
ListView<String> list = new ListView<>();
list.getItems().addAll("Un", "Deux", "Trois");
```

> **Astuce :**
> Utilise `getItems().addAll(...)` pour remplir rapidement une liste ou un menu.

## Les tables

Pour afficher des données tabulaires (comme dans un tableur) :
- **TableView** : Tableau de données (colonnes, lignes, tri, etc.).

```java
TableView<Person> table = new TableView<>();
TableColumn<Person, String> col = new TableColumn<>("Nom");
table.getColumns().add(col);
```

> **Astuce :**
> Les tables sont puissantes mais nécessitent de définir des colonnes et un modèle de données.

## Les sliders et barres de progression

Pour afficher ou sélectionner une valeur numérique :
- **Slider** : Curseur pour sélectionner une valeur.
- **ProgressBar** : Barre de progression horizontale.
- **ProgressIndicator** : Indicateur circulaire de progression.

```java
Slider slider = new Slider(0, 100, 50); // min, max, valeur initiale
ProgressBar pb = new ProgressBar(0.5); // 50%
ProgressIndicator pi = new ProgressIndicator();
```

> **Astuce :**
> Les sliders sont utiles pour régler un volume, une luminosité, etc.

## Les images et médias

Pour afficher une image dans l’interface :
- **ImageView** : Affichage d’images.

```java
ImageView iv = new ImageView(new Image("fichier.png"));
```

> **Astuce :**
> Tu peux redimensionner une image avec `setFitWidth` et `setFitHeight`.

## Les alertes et boîtes de dialogue

Pour afficher des messages ou demander une confirmation à l’utilisateur :
- **Alert** : Fenêtre de dialogue standard.

```java
Alert alert = new Alert(Alert.AlertType.INFORMATION);
alert.setTitle("Info");
alert.setHeaderText(null);
alert.setContentText("Message d'information");
alert.showAndWait();
```

> **Astuce :**
> Utilise les alertes pour informer, avertir ou demander une action à l'utilisateur.

## ColorPicker

Le `ColorPicker` permet à l’utilisateur de choisir une couleur facilement via une palette graphique.

- Idéal pour les applications de dessin, de personnalisation, ou tout ce qui nécessite un choix de couleur.

**Exemple d'utilisation**

```java
ColorPicker picker = new ColorPicker();
```

**Explication :**
Un `ColorPicker` permet à l'utilisateur de choisir une couleur via une palette graphique.

## Les formes

JavaFX permet d’ajouter facilement des formes géométriques à l’interface. Ces formes sont aussi des noeuds, donc on peut leur appliquer des événements, des effets, etc.

- **Circle** : Cercle
- **Rectangle** : Rectangle

```java
new Circle(200, 200, 200, Color.GREEN); // centreX, centreY, rayon, couleur
new Rectangle(200, 200, 200, 200, Color.GREEN);
```

> **Astuce :**
> Les formes sont idéales pour illustrer, dessiner ou créer des jeux simples.

> **Astuce :**
> Consulte la documentation officielle JavaFX pour découvrir d'autres composants avancés (TreeView, WebView, ColorPicker, DatePicker, etc.) et leurs possibilités !