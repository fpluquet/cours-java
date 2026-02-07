# Les constantes en Java

Dans la vie d’un programme, il y a des valeurs qui ne doivent jamais changer : des références fixes, des bornes, des paramètres universels… Pour cela, Java permet de définir des constantes, c’est-à-dire des variables dont la valeur est figée une fois pour toutes.

Pour déclarer une constante, on utilise le mot-clé `final`. Cela signifie que la variable ne pourra plus jamais être modifiée après son initialisation.

Souvent, on combine `final` avec `static` pour créer une constante partagée par toutes les instances d’une classe :

```java
public static final int MA_CONSTANTE = 25;
```

Ici, `MA_CONSTANTE` est une constante entière, accessible partout dans le programme, et impossible à modifier. Par convention, on écrit les noms de constantes en majuscules, séparées par des underscores, pour bien les distinguer des autres variables.

## Exemple d’utilisation

Imaginons que vous souhaitiez calculer le périmètre d’un cercle en utilisant une constante pour la valeur de π :

```java
public class Cercle {
    public static final double PI = 3.14159;

    public static double perimetre(double rayon) {
        return 2 * PI * rayon;
    }
}

// Utilisation :
double p = Cercle.perimetre(10); // p vaudra 62.8318
```

Utiliser des constantes rend votre code plus lisible, plus sûr, et plus facile à maintenir. C’est un réflexe à adopter dès que vous manipulez des valeurs fixes ou universelles.
