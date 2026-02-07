# Tableaux

Les tableaux sont des structures de données fondamentales en Java. Ils permettent de stocker plusieurs valeurs du même type dans une seule variable, ce qui facilite la gestion de collections d’éléments (nombres, objets, etc.).

::: tip À retenir
Un tableau occupe un espace contigu en mémoire et chaque élément est accessible par son indice (la position dans le tableau, qui commence toujours à 0).
:::

## Définition et création d’un tableau

Un tableau est un objet en Java. Sa création nécessite donc l’utilisation du mot-clé `new`. Tous les éléments d’un tableau doivent être du même type (primitif ou objet).

```java
// Deux façons équivalentes d’instancier un tableau d’entiers :
int tabEntiers[] = new int[10]; // Syntaxe tolérée, mais moins recommandée
int[] tabEntiers2 = new int[10]; // Syntaxe recommandée
```

::: info
Préférez la syntaxe `int[] tab` pour plus de clarté, surtout quand vous déclarez plusieurs tableaux sur une même ligne.
:::

## Tableaux multidimensionnels

Java permet de créer des tableaux à plusieurs dimensions (par exemple, des matrices). Un tableau à deux dimensions est en fait un tableau de tableaux.

```java
int[][] tableauMulti = new int[10][5]; // 10 lignes, 5 colonnes
```

::: info
Les tableaux multidimensionnels ne sont pas forcément « rectangulaires » en Java. Chaque sous-tableau peut avoir une taille différente.
:::

## Parcourir un tableau

Pour accéder à chaque élément d’un tableau, on utilise généralement des boucles. Les deux plus courantes sont la boucle `for` classique (avec un indice) et la boucle `foreach` (pour parcourir tous les éléments sans se soucier de l’indice).

```java
int[] tableauUni = new int[10];
int[][] tableauMulti = new int[10][5];
// Avec une boucle for classique :
for(int i = 0; i < tableauUni.length; i++){
    System.out.println(tableauUni[i]);
}
for(int i = 0; i < tableauMulti.length; i++){
    for(int j = 0; j < tableauMulti[i].length; j++){
        System.out.println(tableauMulti[i][j]);
    }
}
// Avec une boucle foreach (for-each) :
for(int[] row : tableauMulti){
    for(int nb : row){
        System.out.println(nb);
    }
}
for(int nb : tableauUni){
    System.out.println(nb);
    // Plus facile avec un foreach !
}
```

::: warning Attention
En Java, la propriété pour obtenir la taille d’un tableau est `length` (sans parenthèses), et non `Length` ou `length()`.
:::

---

Les tableaux sont très efficaces pour manipuler des collections fixes de données. Pour des collections dynamiques (qui changent de taille), il existe d’autres structures comme `ArrayList`.

::: tip Pour aller plus loin
Essayez d’écrire des fonctions qui prennent un tableau en paramètre, ou qui retournent un tableau, pour bien comprendre leur manipulation !
:::
