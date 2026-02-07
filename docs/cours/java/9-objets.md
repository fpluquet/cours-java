# Objets

En Java, les objets sont le cœur même du langage orienté objet. Ils représentent des entités concrètes ou abstraites, dotées de caractéristiques (attributs) et de comportements (méthodes). Comprendre la notion d’objet, c’est franchir une étape essentielle dans la programmation Java.

::: tip À retenir
Un objet est une instance d’une classe. Si la classe est le plan, l’objet est la maison construite à partir de ce plan.
:::

## Instanciation d'un objet

Pour créer un objet, on utilise le mot-clé `new`, qui permet d’allouer de la mémoire et d’appeler le constructeur de la classe. Voici un exemple d’instanciation :

```java
Object objet = new Object();
```

On peut également attribuer la valeur `null` à une variable de type objet, ce qui signifie qu’elle ne référence aucun objet pour l’instant :

```java
Object objet1 = null;
```

::: info
Une variable objet non initialisée a la valeur `null` par défaut. Il est donc important de vérifier qu’une variable n’est pas `null` avant de l’utiliser, pour éviter les erreurs d’exécution (NullPointerException).
:::

```java
Object objet2;
if(objet2 == null){
    // On peut faire des actions ici
}
```

### La méthode `toString()`

La méthode `toString()` est définie dans la classe `Object`. Comme toutes les classes héritent de `Object`, cette méthode peut être appelée sur n’importe quel objet. Par défaut, elle affiche le nom du package et de la classe, suivi d’un identifiant. On redéfinit souvent cette méthode pour obtenir une représentation plus lisible de nos objets.

::: tip Bon à savoir
Redéfinir `toString()` dans vos classes rend le débogage et l’affichage d’informations beaucoup plus pratiques !
:::

## Le "static"

Il est possible d’accéder à des membres statiques dans une classe. Un membre statique est lié à la classe elle-même, et non à une instance particulière. Cela signifie qu’il n’est pas nécessaire de créer un objet pour accéder à ces membres : ils sont partagés par toutes les instances de la classe.

```java
public class Main{
    public static void main(String[] args){
        double pi = Maths.Pi;
        // OK
    }
}
class Maths{
    public final static double Pi = 3.1415;
}
```

On peut également créer des méthodes statiques, qui fonctionnent sur le même principe :

```java
public class Main{
    public static void main(String[] args){
        int add = Maths.Addition(1, 2);
        // add = 3
        // OK
    }
}
class Maths{
    public static int Addition(int a, int b){
        return a + b;
    }
}
```

::: warning Important
Dans une méthode statique, le mot-clé `this` ne peut pas être utilisé. En effet, il n’y a pas d’objet sur lequel faire référence, puisque la méthode est appelée sur la classe directement (`Maths.Addition(1,2)`).
:::

---

Ainsi, manipuler des objets et comprendre la différence entre membres statiques et non-statiques est fondamental pour écrire du code Java efficace et robuste.

::: tip Pour aller plus loin
Essayez de créer vos propres classes avec des attributs et des méthodes statiques, puis manipulez-les dans un programme pour bien saisir la différence avec les membres d’instance !
:::
