# Quelques classes utiles

Dans l’univers Java, certaines classes sont de véritables piliers. Elles accompagnent chaque programmeur, du tout premier « Hello World » aux applications les plus ambitieuses. Découvrons ensemble ces compagnons incontournables.

## La classe contenant une méthode `public static void main`

Tout commence ici. La porte d’entrée de chaque programme Java, c’est cette fameuse classe qui abrite la méthode `public static void main`. C’est elle qui donne le top départ à l’exécution de votre code, le point de rendez-vous de toutes vos idées logicielles.

```java
class Exemple {
    static void main(String[] args) {
        // c'est ici que vous écrivez votre programme principal
    }
}
```

## La classe System

Impossible de faire ses premiers pas en Java sans croiser la route de la classe `System`. Véritable boîte à outils, elle met à disposition des flux d’entrée et de sortie, essentiels pour dialoguer avec l’utilisateur ou afficher des résultats.

- L’attribut statique `out` vous permet d’écrire à l’écran :
  - La méthode `println` pour afficher une ligne et passer à la suivante :
    ```java
    System.out.println("Mon texte");
    // Surcharges pour tous les types existantes
    ```
  - La méthode `print` pour afficher sans retour à la ligne :
    ```java
    System.out.print(maVariable);
    // Il existe des surcharges pour tous les types
    ```
- Il existe aussi un attribut statique `in` pour les entrées clavier. Mais, pour plus de confort, on lui préfère souvent la classe `Scanner`.

## La classe Scanner

Lire ce que l’utilisateur saisit, c’est le rôle de la classe `Scanner` (du package `java.util`). Elle rend la lecture de texte ou de nombres aussi simple qu’intuitive.

- Son constructeur prend en argument un flux d’entrée (ici, la console) :
  ```java
  Scanner scanner = new Scanner(System.in);
  String s = scanner.next();
  int i = scanner.nextInt();
  ```

Grâce à ces classes, vous disposez déjà d’un arsenal pour interagir avec le monde extérieur. Prêt à écrire vos premiers programmes dynamiques ?
