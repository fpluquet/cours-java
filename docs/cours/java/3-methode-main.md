# La méthode `main`

Au cœur de chaque programme Java, il y a un point de départ, un rituel immuable : la méthode `main`. C’est elle qui donne vie à votre application, qui orchestre le tout premier souffle de votre code.

Comme nous l’avons déjà évoqué, Java est un langage farouchement orienté objet. Rien n’existe en dehors d’une classe, et la méthode `main` ne fait pas exception à la règle. Elle est le portail d’entrée, le chef d’orchestre qui lance l’exécution.

Sa signature est sacrée :
```java
public static void main(String[] args)
```
- `public` : pour être accessible par la machine virtuelle Java.
- `static` : car elle doit pouvoir être appelée sans qu’aucun objet ne soit encore créé.
- `void` : elle ne renvoie rien, elle agit.
- `String[] args` : un tableau de chaînes de caractères, pour recevoir d’éventuels arguments passés lors du lancement du programme.

À noter : contrairement à d’autres langages comme C#, le nom du fichier exécuté ne fait pas partie de ces arguments. Seuls les paramètres explicitement fournis à l’exécution y figurent.

## Exemple : exploiter les arguments de la ligne de commande

La méthode `main` peut recevoir des paramètres lors du lancement du programme. Ceux-ci sont accessibles via le tableau `args`. Voici un exemple simple qui affiche chaque argument reçu :

```java
public class ArgumentsDemo {
    public static void main(String[] args) {
        System.out.println("Nombre d'arguments : " + args.length);
        for (int i = 0; i < args.length; i++) {
            System.out.println("Argument " + i + " : " + args[i]);
        }
    }
}
```

Si vous lancez ce programme avec la commande :
```
java ArgumentsDemo bonjour 42 test
```
Vous obtiendrez :
```
Nombre d'arguments : 3
Argument 0 : bonjour
Argument 1 : 42
Argument 2 : test
```

Ainsi, la méthode `main` est la porte d’entrée universelle de vos aventures Java. C’est ici que tout commence !
