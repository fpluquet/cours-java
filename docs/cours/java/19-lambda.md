# Interfaces fonctionnelles et expressions lambda

Les interfaces fonctionnelles et les expressions lambda sont deux concepts clés introduits en Java 8 pour rendre le code plus concis, lisible et orienté « programmation fonctionnelle ».

::: tip À retenir
Les lambdas permettent de passer du comportement (du code) en paramètre, rendant le code plus flexible et expressif.
:::

## Qu'est-ce qu'une interface fonctionnelle ?

Une interface fonctionnelle est une interface qui ne contient **qu'une seule méthode abstraite** (mais peut contenir des méthodes par défaut ou statiques). C'est ce type d'interface qui peut être utilisé avec les expressions lambda.

::: info Exemples d'interfaces fonctionnelles dans Java
- `Runnable` (méthode `void run()`)
- `Comparator<T>` (méthode `int compare(T o1, T o2)`)
- `java.util.function.Function<T, R>`
:::

## Les expressions Lambda

### Introduction aux Lambdas

Les lambdas permettent d'écrire des fonctions anonymes plus concises, c'est-à-dire du code que l'on peut passer comme paramètre à une méthode, sans créer de classe anonyme.

::: info
Avant Java 8, il fallait utiliser des classes anonymes pour passer du code en paramètre. Les lambdas simplifient et raccourcissent énormément cette syntaxe.
:::

### Syntaxe générale d'une expression lambda

```java
(paramètres) -> expression
```

- Si le corps contient plusieurs instructions, on utilise des accolades :

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

::: tip Important
- Si la lambda ne prend qu'un paramètre, les parenthèses sont optionnelles.
- Si le corps ne contient qu'une instruction, les accolades et le `return` sont optionnels.
:::

### Quand utiliser les lambdas ?

Les lambdas sont utiles pour passer du code en paramètre, notamment dans les API fonctionnelles (ex : tri, filtres, transformations, gestionnaires d'événements, etc.).

**Exemple : tri d'une liste**

```java
List<String> noms = Arrays.asList("Alice", "Bob", "Charlie");
noms.sort((a, b) -> a.compareToIgnoreCase(b));
```

### Limites des Lambdas

- Les lambdas ne peuvent accéder qu'à des variables locales qui sont finales ou effectivement finales (c'est-à-dire non modifiées après leur affectation).
- Elles ne peuvent pas redéfinir plusieurs méthodes (une seule méthode abstraite dans l'interface fonctionnelle).

::: tip À savoir
Les lambdas ne créent pas de nouvelle portée pour les variables locales, contrairement aux classes anonymes.
:::

## Le tag `@FunctionalInterface`

Le tag `@FunctionalInterface` permet d'indiquer explicitement qu'une interface est fonctionnelle. Cela force le compilateur à vérifier qu'il n'y a qu'une seule méthode abstraite.

```java
@FunctionalInterface
interface Calculateur {
    int calculer(int a, int b);
}
```

::: info
Ce tag est optionnel mais recommandé pour la clarté et la sécurité du code.
:::

## Les interfaces fonctionnelles du package `java.util.function`

Java fournit un ensemble complet d'interfaces fonctionnelles prêtes à l'emploi dans le package `java.util.function`. Plutôt que de créer vos propres interfaces à chaque fois, vous pouvez utiliser celles-ci. Elles couvrent la grande majorité des cas d'usage.

### `Function<T, R>` — Transformer une valeur

`Function<T, R>` représente une fonction qui prend un argument de type `T` et retourne un résultat de type `R`. Sa méthode abstraite est `R apply(T t)`.

```java
Function<String, Integer> longueur = s -> s.length();
System.out.println(longueur.apply("Hello"));  // 5

Function<Integer, String> toText = n -> "Nombre : " + n;
System.out.println(toText.apply(42));  // "Nombre : 42"
```

::: tip Composition de fonctions
`Function` offre des méthodes par défaut pour **composer** des fonctions entre elles :
- `andThen(Function)` : applique d'abord la première fonction, puis la seconde sur le résultat.
- `compose(Function)` : applique d'abord la fonction passée en paramètre, puis la première.
:::

```java
Function<String, Integer> longueur = s -> s.length();
Function<Integer, Boolean> estLong = n -> n > 5;

// Chaîner : d'abord la longueur, puis vérifier si c'est long
Function<String, Boolean> estMotLong = longueur.andThen(estLong);
System.out.println(estMotLong.apply("lambda"));       // true
System.out.println(estMotLong.apply("code"));         // false
```

### `BiFunction<T, U, R>` — Transformer deux valeurs en une

`BiFunction<T, U, R>` est similaire à `Function`, mais prend **deux paramètres** au lieu d'un. Sa méthode abstraite est `R apply(T t, U u)`.

```java
BiFunction<String, String, String> concat = (a, b) -> a + " " + b;
System.out.println(concat.apply("Hello", "World"));  // "Hello World"

BiFunction<Integer, Integer, Double> moyenne = (a, b) -> (a + b) / 2.0;
System.out.println(moyenne.apply(10, 20));  // 15.0
```

### `Consumer<T>` — Consommer une valeur (pas de retour)

`Consumer<T>` représente une opération qui prend un argument et **ne retourne rien** (`void`). Sa méthode abstraite est `void accept(T t)`.

C'est utile lorsqu'on veut effectuer une action sur un élément (affichage, journalisation, modification d'un objet, etc.).

```java
Consumer<String> afficher = s -> System.out.println(s);
afficher.accept("Bonjour !");  // Bonjour !

Consumer<List<String>> viderListe = liste -> liste.clear();
List<String> noms = new ArrayList<>(Arrays.asList("Alice", "Bob"));
viderListe.accept(noms);
System.out.println(noms);  // []
```

::: info Chaîner des consumers
La méthode `andThen(Consumer)` permet d'enchaîner deux consumers :
```java
Consumer<String> afficher = s -> System.out.print(s);
Consumer<String> retourLigne = s -> System.out.println(" (" + s.length() + " caractères)");

Consumer<String> afficherAvecTaille = afficher.andThen(retourLigne);
afficherAvecTaille.accept("Java");  // Java (4 caractères)
```
:::

### `BiConsumer<T, U>` — Consommer deux valeurs

`BiConsumer<T, U>` prend **deux paramètres** et ne retourne rien. Sa méthode abstraite est `void accept(T t, U u)`.

```java
BiConsumer<String, Integer> afficherRepete = (texte, n) -> {
    for (int i = 0; i < n; i++) {
        System.out.println(texte);
    }
};
afficherRepete.accept("Hello", 3);
// Hello
// Hello
// Hello
```

### `Predicate<T>` — Tester une condition

`Predicate<T>` représente une fonction qui prend un argument et retourne un **booléen**. Sa méthode abstraite est `boolean test(T t)`.

C'est l'interface idéale pour les filtres et les validations.

```java
Predicate<String> estVide = s -> s.isEmpty();
System.out.println(estVide.test(""));      // true
System.out.println(estVide.test("Java"));  // false

Predicate<Integer> estPair = n -> n % 2 == 0;
System.out.println(estPair.test(4));  // true
```

::: tip Combiner des prédicats
`Predicate` offre des méthodes pour combiner des conditions logiques :
- `and(Predicate)` : ET logique
- `or(Predicate)` : OU logique
- `negate()` : NON logique (inverse la condition)
:::

```java
Predicate<Integer> estPositif = n -> n > 0;
Predicate<Integer> estPair = n -> n % 2 == 0;

Predicate<Integer> estPositifEtPair = estPositif.and(estPair);
System.out.println(estPositifEtPair.test(4));   // true
System.out.println(estPositifEtPair.test(-2));  // false
System.out.println(estPositifEtPair.test(3));   // false

Predicate<Integer> estImpair = estPair.negate();
System.out.println(estImpair.test(3));  // true
```

### `Supplier<T>` — Fournir une valeur (pas de paramètre)

`Supplier<T>` représente une fonction qui **ne prend aucun paramètre** et retourne une valeur de type `T`. Sa méthode abstraite est `T get()`.

C'est utile pour la création paresseuse d'objets ou la génération de valeurs.

```java
Supplier<String> salutation = () -> "Bonjour le monde !";
System.out.println(salutation.get());  // Bonjour le monde !

Supplier<List<String>> listeVide = () -> new ArrayList<>();
List<String> maListe = listeVide.get();  // nouvelle liste vide à chaque appel

Supplier<Double> aleatoire = () -> Math.random();
System.out.println(aleatoire.get());  // 0.42... (valeur aléatoire)
```

### `UnaryOperator<T>` et `BinaryOperator<T>` — Cas spéciaux

- `UnaryOperator<T>` est un cas particulier de `Function<T, T>` : le type d'entrée et le type de retour sont **les mêmes**.
- `BinaryOperator<T>` est un cas particulier de `BiFunction<T, T, T>` : les deux paramètres et le retour sont du **même type**.

```java
UnaryOperator<String> majuscule = s -> s.toUpperCase();
System.out.println(majuscule.apply("hello"));  // HELLO

BinaryOperator<Integer> somme = (a, b) -> a + b;
System.out.println(somme.apply(3, 7));  // 10
```

### Tableau récapitulatif

| Interface | Paramètres | Retour | Méthode abstraite | Usage typique |
|---|---|---|---|---|
| `Function<T, R>` | 1 (`T`) | `R` | `R apply(T)` | Transformation |
| `BiFunction<T, U, R>` | 2 (`T`, `U`) | `R` | `R apply(T, U)` | Transformation à 2 entrées |
| `Consumer<T>` | 1 (`T`) | `void` | `void accept(T)` | Action sans retour |
| `BiConsumer<T, U>` | 2 (`T`, `U`) | `void` | `void accept(T, U)` | Action à 2 entrées |
| `Predicate<T>` | 1 (`T`) | `boolean` | `boolean test(T)` | Filtre / validation |
| `Supplier<T>` | 0 | `T` | `T get()` | Fournir / créer |
| `UnaryOperator<T>` | 1 (`T`) | `T` | `T apply(T)` | Transformation même type |
| `BinaryOperator<T>` | 2 (`T`, `T`) | `T` | `T apply(T, T)` | Combinaison même type |
| `Runnable` | 0 | `void` | `void run()` | Exécution sans retour |

::: warning Variantes primitives
Pour éviter l'autoboxing (conversion automatique entre types primitifs et objets), Java fournit des variantes spécialisées pour les types primitifs `int`, `long` et `double`. Par exemple : `IntFunction<R>`, `IntConsumer`, `IntSupplier`, `IntPredicate`, `IntUnaryOperator`, `ToIntFunction<T>`, etc. Elles fonctionnent exactement de la même manière, mais avec des types primitifs.
:::

## Les références de méthode (`::`)

Une **référence de méthode** est un raccourci syntaxique pour une lambda qui ne fait qu'appeler une méthode existante. Elle améliore la lisibilité du code.

### Syntaxe

Les formes possibles sont :
- `objet::methode` → équivalent à `x -> objet.methode(x)`
- `Classe::methodeInstance` → équivalent à `x -> x.methodeInstance()`
- `Classe::methodeStatique` → équivalent à `x -> Classe.methodeStatique(x)`
- `Classe::new` → équivalent à `x -> new Classe(x)` (référence au constructeur)

### Exemples

```java
// Au lieu de : s -> s.length()
Function<String, Integer> longueur = String::length;

// Au lieu de : s -> System.out.println(s)
Consumer<String> afficher = System.out::println;

// Au lieu de : s -> s.toUpperCase()
Function<String, String> majuscule = String::toUpperCase;

// Au lieu de : () -> new ArrayList<>()
Supplier<ArrayList<String>> fabrique = ArrayList::new;

// Au lieu de : (a, b) -> Integer.max(a, b)
BinaryOperator<Integer> max = Integer::max;

// Au lieu de : s -> Integer.parseInt(s)
Function<String, Integer> parser = Integer::parseInt;
```

::: tip Quand utiliser les références de méthode ?
Utilisez-les quand votre lambda ne fait **qu'appeler une seule méthode** sans logique supplémentaire. Cela rend le code plus lisible et concis.
:::

---

*Essayez de remplacer une classe anonyme par une lambda, et observez la différence de syntaxe et de lisibilité !*

---

## Exercices de compréhension

### Exercice 1 : Déterminer si c'est une interface fonctionnelle

Parmi les interfaces suivantes, lesquelles sont des interfaces fonctionnelles ? Justifiez.

```java
// 1
interface A {
    void methode1();
}

// 2
interface B {
    void methode1();
    void methode2();
}

// 3
interface C {
    void methode1();
    default void methode2() { }
}

// 4
interface D {
    void methode1();
    static void methode2() { }
}

// 5
interface E extends Runnable {
    void methode1();
}

// 6
interface F extends Runnable {
    default void run() { }
    void methode1();
}
```

::: details Suggestions des réponses
1. ✅ Oui — une seule méthode abstraite
2. ❌ Non — deux méthodes abstraites
3. ✅ Oui — une seule méthode abstraite (`methode2` a une implémentation par défaut)
4. ✅ Oui — une seule méthode abstraite (`methode2` est statique, pas abstraite)
5. ❌ Non — deux méthodes abstraites (`methode1` de E et `run()` héritée de Runnable)
6. ✅ Oui — une seule méthode abstraite (`methode1`), car `run()` a une implémentation `default`
:::

### Exercice 2 : Identifier le type d'interface fonctionnelle

Pour chacune des lambdas suivantes, indiquez quelle interface fonctionnelle du package `java.util.function` (ou autre) pourrait servir de type à la variable :

```java
// 1
__________ test1 = () -> System.out.println("Hello");

// 2
__________ test2 = (String s) -> s.length();

// 3
__________ test3 = (String s) -> !s.isEmpty();

// 4
__________ test4 = () -> 42;

// 5
__________ test5 = (String a, String b) -> a + " " + b;

// 6
__________ test6 = (int n) -> n * n;

// 7
__________ test7 = (String s) -> System.out.println(s);

// 8
__________ test8 = (String s, Integer n) -> s.repeat(n);
```

::: details Suggestions des réponses
1. `Runnable` — aucun paramètre, pas de retour (`void run()`)
2. `Function<String, Integer>` — prend un `String`, retourne un `Integer` (`Integer apply(String)`)
3. `Predicate<String>` — prend un `String`, retourne un `boolean` (`boolean test(String)`)
4. `Supplier<Integer>` — aucun paramètre, retourne un `Integer` (`Integer get()`)
5. `BinaryOperator<String>` (ou `BiFunction<String, String, String>`) — prend deux `String`, retourne un `String`
6. `IntUnaryOperator` (ou `UnaryOperator<Integer>`) — prend un entier, retourne un entier de même type
7. `Consumer<String>` — prend un `String`, ne retourne rien (`void accept(String)`)
8. `BiFunction<String, Integer, String>` — prend deux paramètres de types différents, retourne un `String`
:::

### Exercice 3 : Écrire des lambdas à partir d'interfaces

Proposez une lambda pour chacune des interfaces ou types suivants :

```java
// 1. Interface personnalisée
@FunctionalInterface
interface Multiplicateur {
    int multiplier(int a, int b);
}
Multiplicateur mult = ____________________________;

// 2. Consumer<List<String>> qui trie la liste et l'affiche
Consumer<List<String>> trierEtAfficher = ____________________________;

// 3. Function<String, String> qui retourne la première lettre en majuscule + le reste en minuscule
Function<String, String> capitaliser = ____________________________;

// 4. BiFunction<String, Integer, String> qui retourne les n premiers caractères d'une chaîne
BiFunction<String, Integer, String> tronquer = ____________________________;

// 5. Predicate<Integer> qui vérifie si un nombre est un multiple de 3 ET de 5
Predicate<Integer> multiplesDe3Et5 = ____________________________;

// 6. Supplier<List<Integer>> qui fournit une liste contenant [1, 2, 3]
Supplier<List<Integer>> listeFournisseur = ____________________________;
```

::: details Suggestions des réponses
1. `(a, b) -> a * b`
2. `liste -> { Collections.sort(liste); liste.forEach(System.out::println); }`
3. `s -> s.substring(0, 1).toUpperCase() + s.substring(1).toLowerCase()`
4. `(s, n) -> s.substring(0, Math.min(n, s.length()))`
5. `n -> n % 3 == 0 && n % 5 == 0`
6. `() -> Arrays.asList(1, 2, 3)`
:::

### Exercice 4 : Références de méthode

Réécrivez chaque lambda en utilisant une **référence de méthode** (`::`) :

```java
// 1
Function<String, Integer> f1 = s -> s.length();
Function<String, Integer> f1bis = ___________________;

// 2
Consumer<String> c1 = s -> System.out.println(s);
Consumer<String> c1bis = ___________________;

// 3
Function<String, String> f2 = s -> s.toUpperCase();
Function<String, String> f2bis = ___________________;

// 4
Supplier<ArrayList<String>> s1 = () -> new ArrayList<>();
Supplier<ArrayList<String>> s1bis = ___________________;

// 5
BinaryOperator<Integer> b1 = (a, b) -> Integer.max(a, b);
BinaryOperator<Integer> b1bis = ___________________;

// 6
Function<String, Integer> f3 = s -> Integer.parseInt(s);
Function<String, Integer> f3bis = ___________________;
```

::: details Suggestions des réponses
1. `String::length`
2. `System.out::println`
3. `String::toUpperCase`
4. `ArrayList::new`
5. `Integer::max`
6. `Integer::parseInt`
:::

### Exercice 5 : Composition de fonctions et prédicats

Indiquez le résultat de chaque expression :

```java
Function<String, Integer> longueur = s -> s.length();
Function<Integer, Boolean> estPair = n -> n % 2 == 0;
Function<String, Boolean> longueurPaire = longueur.andThen(estPair);

// 1. Que retourne longueurPaire.apply("Java") ?
// Réponse : ___________

// 2. Que retourne longueurPaire.apply("Hello") ?
// Réponse : ___________

Predicate<Integer> positif = n -> n > 0;
Predicate<Integer> petit = n -> n < 100;
Predicate<Integer> positifEtPetit = positif.and(petit);
Predicate<Integer> negatifOuGrand = positifEtPetit.negate();

// 3. Que retourne positifEtPetit.test(50) ?
// Réponse : ___________

// 4. Que retourne positifEtPetit.test(-5) ?
// Réponse : ___________

// 5. Que retourne negatifOuGrand.test(50) ?
// Réponse : ___________

// 6. Que retourne negatifOuGrand.test(200) ?
// Réponse : ___________

UnaryOperator<String> trim = String::trim;
UnaryOperator<String> upper = String::toUpperCase;
Function<String, String> trimPuisUpper = trim.andThen(upper);

// 7. Que retourne trimPuisUpper.apply("  hello  ") ?
// Réponse : ___________
```

::: details Suggestions des réponses
1. `true` — "Java" a 4 caractères, 4 est pair
2. `false` — "Hello" a 5 caractères, 5 est impair
3. `true` — 50 est positif ET inférieur à 100
4. `false` — -5 n'est pas positif
5. `false` — c'est la négation de `true` (50 est positif et petit)
6. `true` — c'est la négation de `false` (200 est positif mais pas < 100)
7. `"HELLO"` — d'abord `trim` donne `"hello"`, puis `toUpperCase` donne `"HELLO"`
:::

### Exercice 6 : Analyser et corriger

Identifiez les erreurs dans les codes suivants et proposez une correction :

```java
// Erreur 1
@FunctionalInterface
interface Erreur1 {
    int calculer(int a);
    String transformer(String s);
}

// Erreur 2
int x = 10;
Runnable r = () -> {
    x = 20;
    System.out.println("Valeur : " + x);
};

// Erreur 3
Consumer<String> c = s -> s.toUpperCase();  // ❌ Quelle est l'erreur ?
```

::: details Suggestions des réponses
1. Une interface `@FunctionalInterface` ne peut avoir qu'une seule méthode abstraite. Il faut supprimer l'une des deux méthodes.
2. Une lambda ne peut modifier que des variables **finales ou effectivement finales**. `x` est modifié dans la lambda, ce qui est interdit. Il faut ne pas modifier `x`.
3. Un `Consumer` ne retourne rien (`void`). Or `s.toUpperCase()` retourne une valeur qui est ignorée. Ce n'est pas une erreur de compilation, mais c'est sémantiquement incorrect : le résultat de `toUpperCase()` est perdu. Il faudrait utiliser une `Function<String, String>` si on veut transformer, ou un `Consumer` qui fait quelque chose d'utile comme `s -> System.out.println(s.toUpperCase())`.
:::

---

## Exercices de production

### Exercice 1 : Manipuler des interfaces fonctionnelles standard

Écrivez un programme qui utilise les interfaces fonctionnelles standard de `java.util.function` :

```java
// 1. Créer une Function<String, String> qui retire les espaces et met en majuscule
Function<String, String> nettoyer = /* À compléter */;
// Testez avec : "  hello world  " → "HELLO WORLD"

// 2. Créer un Predicate<String> qui vérifie qu'une chaîne est un email valide (contient @ et .)
Predicate<String> estEmail = /* À compléter */;

// 3. En utilisant la composition (andThen), créer une fonction qui :
//    - nettoie la chaîne (trim + majuscule)
//    - puis retourne sa longueur
Function<String, Integer> nettoyerPuisCompter = /* À compléter */;

// 4. Créer un Predicate composé avec and() et or() :
//    - le mot fait plus de 3 caractères ET (commence par "J" OU finit par "a")
Predicate<String> filtreCombine = /* À compléter */;

// 5. Créer un Consumer<String> qui affiche un mot encadré de "***"
//    puis chaîner un second Consumer qui affiche la longueur
Consumer<String> afficherDecore = /* À compléter */;

// 6. Créer un Supplier<LocalDateTime> qui retourne l'instant actuel
Supplier<LocalDateTime> maintenant = /* À compléter */;

// 7. Créer un BinaryOperator<String> qui retourne la plus longue des deux chaînes
BinaryOperator<String> plusLongue = /* À compléter */;
```

---

::: tip Conseils pour les exercices
- Exploitez la composition (`andThen`, `compose`, `and`, `or`, `negate`) pour construire des comportements complexes
- Préférez les références de méthode (`::`) quand la lambda ne fait qu'appeler une méthode existante
- Testez votre code en ayant des cas de test variés
:::
