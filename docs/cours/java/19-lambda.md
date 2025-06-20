# Interfaces fonctionnelles et expressions lambda

Les interfaces fonctionnelles et les expressions lambda sont deux concepts clés introduits en Java 8 pour rendre le code plus concis, lisible et orienté « programmation fonctionnelle ».

> **À retenir :** Les lambdas permettent de passer du comportement (du code) en paramètre, rendant le code plus flexible et expressif.

## Qu'est-ce qu'une interface fonctionnelle ?

Une interface fonctionnelle est une interface qui ne contient **qu'une seule méthode abstraite** (mais peut contenir des méthodes par défaut ou statiques). C’est ce type d’interface qui peut être utilisé avec les expressions lambda.

> **Exemples d’interfaces fonctionnelles dans Java :**
> - `Runnable` (méthode `void run()`)
> - `Comparator<T>` (méthode `int compare(T o1, T o2)`)
> - `java.util.function.Function<T, R>`

## Les expressions Lambda

### Introduction aux Lambdas

Les lambdas permettent d'écrire des fonctions anonymes plus concises, c’est-à-dire du code que l’on peut passer comme paramètre à une méthode, sans créer de classe anonyme.

> **Info :** Avant Java 8, il fallait utiliser des classes anonymes pour passer du code en paramètre. Les lambdas simplifient et raccourcissent énormément cette syntaxe.

### Syntaxe générale d'une expression lambda

```java
(paramètres) -> expression
```

- Si le corps contient plusieurs instructions, on utilise des accolades :

```java
(paramètres) -> {
    // instructions
    return valeur;
}
```

### Exemples de lambdas simples

```java
Runnable r = () -> System.out.println("Hello");

Comparator<Integer> comp = (a, b) -> a - b;

Function<String, Integer> longueur = s -> s.length();
```

> **Pédagogie :**
> - Si la lambda ne prend qu'un paramètre, les parenthèses sont optionnelles.
> - Si le corps ne contient qu'une instruction, les accolades et le `return` sont optionnels.

### Quand utiliser les lambdas ?

Les lambdas sont utiles pour passer du code en paramètre, notamment dans les API fonctionnelles (ex : tri, filtres, transformations, gestionnaires d’événements, etc.).

**Exemple : tri d’une liste**

```java
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie");
noms.sort((a, b) -> a.compareToIgnoreCase(b));
```

### Limites des Lambdas

- Les lambdas ne peuvent accéder qu’à des variables locales qui sont finales ou effectivement finales (c’est-à-dire non modifiées après leur affectation).
- Elles ne peuvent pas redéfinir plusieurs méthodes (une seule méthode abstraite dans l’interface fonctionnelle).

> **À savoir :** Les lambdas ne créent pas de nouvelle portée pour les variables locales, contrairement aux classes anonymes.

## Le tag `@FunctionalInterface`

Le tag `@FunctionalInterface` permet d’indiquer explicitement qu’une interface est fonctionnelle. Cela force le compilateur à vérifier qu’il n’y a qu’une seule méthode abstraite.

```java
@FunctionalInterface
interface Calculateur {
    int calculer(int a, int b);
}
```

> **Info :** Ce tag est optionnel mais recommandé pour la clarté et la sécurité du code.

---

*Essayez de remplacer une classe anonyme par une lambda, et observez la différence de syntaxe et de lisibilité !*
