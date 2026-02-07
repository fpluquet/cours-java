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
  //scanner.nextInt();
  String s = scanner.next();
  int i = scanner.nextInt();
  ```

Grâce à ces classes, vous disposez déjà d’un arsenal pour interagir avec le monde extérieur. Prêt à écrire vos premiers programmes dynamiques ?
## Nouveauté Java 25 : la classe `IO`

::: tip Java 25
Depuis Java 25, une nouvelle classe `java.lang.IO` simplifie considérablement les entrées/sorties console. Comme elle fait partie du package `java.lang`, elle est disponible sans aucun import dans tous vos programmes.
:::

La classe `IO` propose cinq méthodes statiques pour les opérations de base :

```java
// Afficher du texte (équivalent de System.out.println)
IO.println("Hello, World!");
IO.print("Texte sans retour à la ligne");
IO.println(); // Ligne vide

// Lire une saisie utilisateur (équivalent de Scanner)
String nom = IO.readln("Entrez votre nom : ");
String ligne = IO.readln(); // Sans message d'invite
```

### Comparaison avec l'approche classique

```java
// Avant Java 25 : affichage + lecture
import java.util.Scanner;

public class Demo {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        Scanner scanner = new Scanner(System.in);
        System.out.print("Entrez votre nom : ");
        String nom = scanner.next();
        System.out.println("Bonjour " + nom);
        scanner.close();
    }
}

// Depuis Java 25 : même programme, simplifié
void main() {
    IO.println("Hello, World!");
    String nom = IO.readln("Entrez votre nom : ");
    IO.println("Bonjour " + nom);
}
```

::: info
La classe `IO` ne remplace pas `System.out` ni `Scanner` : ces classes restent disponibles et nécessaires pour des cas plus complexes (lecture de nombres, flux de fichiers, etc.). `IO` est conçue pour simplifier les cas d'usage les plus courants, notamment pour les débutants.
:::

## Nouveauté Java 25 : les imports de modules (`import module`)

::: tip Java 25
Depuis Java 25, il est possible d'importer d'un coup toutes les classes publiques exportées par un module, grâce à la syntaxe `import module`.
:::

Plutôt que d'écrire de multiples imports, on peut écrire une seule ligne :

```java
// Avant Java 25 : imports classiques
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

// Depuis Java 25 : un seul import de module
import module java.base;
```

L'instruction `import module java.base;` rend disponibles toutes les classes de `java.util`, `java.io`, `java.math`, `java.time`, `java.util.stream`, etc. — soit les 54 packages exportés par le module `java.base`.

::: info
Dans un fichier source compact (sans déclaration de classe), `import module java.base;` est automatiquement présent. Vous n'avez même pas besoin de l'écrire !
:::

```java
// Exemple avec import module
import module java.base;

class Demo {
    void main() {
        var noms = List.of("Alice", "Bob", "Charlie");
        var majuscules = noms.stream()
            .map(String::toUpperCase)
            .collect(Collectors.toList());
        IO.println(majuscules);
    }
}
```

::: warning Attention
Si deux modules exportent des classes avec le même nom (ex : `java.util.List` et `java.awt.List`), il faudra résoudre l'ambiguïté avec un import spécifique classique.
:::