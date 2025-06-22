# Les classes anonymes

Les classes anonymes sont un outil puissant et pratique de Java, souvent utilisé pour écrire du code concis, notamment dans les interfaces graphiques, les threads ou les callbacks. Elles permettent de créer une classe « à la volée », sans avoir à lui donner un nom explicite ni à créer un fichier séparé.

::: tip À retenir
Une classe anonyme est une classe sans nom, déclarée et instanciée en une seule expression. Elle est généralement utilisée pour redéfinir rapidement le comportement d’une interface ou d’une classe abstraite.
:::

## Qu'est-ce qu'une classe anonyme ?

Une classe anonyme est une classe interne qui n’a pas de nom. Elle est déclarée et instanciée en même temps, généralement dans le corps d’une méthode. On l’utilise souvent pour fournir une implémentation immédiate d’une interface ou d’une classe abstraite, là où on n’a besoin de cette implémentation qu’une seule fois.

::: info
Les classes anonymes sont très utilisées avant l’arrivée des lambdas (Java 8), mais restent utiles pour les cas où il faut redéfinir plusieurs méthodes ou accéder à l’état local.
:::

## Définition d'une classe anonyme

Voici un exemple classique :

```java
Runnable r = new Runnable() {
    public void run() {
        System.out.println("Hello depuis une classe anonyme !");
    }
};
r.run();
```

Dans cet exemple, on crée une implémentation de l’interface `Runnable` sans créer de classe nommée. On instancie directement un objet qui possède la méthode `run()`.

::: tip Important
- On utilise souvent les classes anonymes pour passer du code en paramètre (ex : gestionnaires d’événements, threads, etc.).
- Elles permettent de garder le code court et localisé, mais peuvent devenir difficiles à lire si elles sont trop longues.
:::

## Utilisation

Les classes anonymes sont très utiles dans les interfaces graphiques (Swing, JavaFX) pour définir le comportement d’un bouton, d’un listener, etc. Elles sont aussi utilisées pour lancer des threads rapidement :

```java
Thread t = new Thread(new Runnable() {
    public void run() {
        System.out.println("Thread lancé !");
    }
});
t.start();
```

::: tip À savoir
Depuis Java 8, on peut souvent remplacer les classes anonymes par des expressions lambda, mais les classes anonymes restent nécessaires si on doit définir plusieurs méthodes ou stocker un état local.
:::

## Attention au mot-clé `this` dans les classes anonymes

Lorsque vous utilisez une classe anonyme à l’intérieur d’une méthode d’un objet, il existe deux contextes différents pour le mot-clé `this` :

- `this` dans la classe anonyme fait référence à l’instance de la classe anonyme elle-même.
- Pour accéder à l’instance englobante (la classe « parente »), il faut utiliser `NomDeLaClasse.this`.

### Exemple explicite :

```java
public class Externe {
    private String nom = "Externe";
    public void demo() {
        Runnable r = new Runnable() {
            private String nom = "Anonyme";
            public void run() {
                System.out.println(this.nom); // Affiche "Anonyme"
                System.out.println(Externe.this.nom); // Affiche "Externe"
            }
        };
        r.run();
    }
}

public class Main {
    public static void main(String[] args) {
        new Externe().demo();
    }
}
```

::: tip À retenir
- `this.nom` fait référence à l’attribut de la classe anonyme.
- `Externe.this.nom` permet d’accéder à l’attribut de la classe englobante.
:::

::: info
Cette syntaxe (`NomDeLaClasse.this`) est très utile pour lever toute ambiguïté, notamment dans les callbacks ou les listeners où on veut accéder à l’objet principal.
:::

---

*Essayez de remplacer une classe anonyme par une lambda lorsque c’est possible, et observez la différence de syntaxe et de lisibilité !*

*Gardez en tête cette subtilité pour éviter les bugs difficiles à repérer dans les programmes utilisant des classes anonymes imbriquées !*
