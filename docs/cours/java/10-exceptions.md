# Exceptions

La gestion des erreurs est un aspect fondamental de la programmation. En Java, ce sont les exceptions qui permettent de signaler et de traiter les situations anormales, sans faire planter tout le programme.

> **À retenir** : Une exception est un événement qui interrompt le déroulement normal du programme. Elle permet de réagir proprement à une erreur, au lieu de laisser le programme s’arrêter brutalement.

## Qu'est-ce qu'une exception ?

Imaginons que vous demandiez à l’utilisateur de saisir un nombre, mais qu’il tape du texte. Si vous essayez de convertir ce texte en entier, Java va lever une exception. Sans gestion appropriée, le programme s’arrête avec un message d’erreur.

Pour éviter cela, il faut gérer les exceptions à l’aide d’un bloc `try-catch`.

## Gérer les exceptions

Le bloc `try` permet d’« essayer » un morceau de code susceptible de générer une exception. Si une exception survient, le contrôle passe dans le bloc `catch` correspondant, où vous pouvez réagir à l’erreur.

> **Info** : Vous pouvez chaîner plusieurs blocs `catch` pour gérer différents types d’exceptions, ou utiliser un seul bloc avec le type `Exception` pour tout attraper.

Exemple :

```java
Scanner scanner = new Scanner(System.in);
try{
    System.out.print("Enter a number: ");
    int i = scanner.nextInt(); // Correction : nextInt() (et non NextInt())
    System.out.println("You entered: " + i);
}
catch(InputMismatchException ex){
    scanner.next(); // On consomme l'entrée incorrecte
    System.out.println("Erreur : vous n'avez pas entré un entier !");
}
scanner.close();
```

> **Attention** : Le nom de la méthode est `nextInt()` (avec un n minuscule), pas `NextInt()`.

## Finally

Le bloc `finally` permet d’exécuter du code dans tous les cas, qu’une exception soit levée ou non. Il est souvent utilisé pour libérer des ressources (fermer un fichier, une connexion, etc.).

```java
try{
    throw new SampleException();
}
catch(SampleException ex){
    // Code si exception
}
finally{
    // Code exécuté dans tous les cas
}
```

## Différence entre Exception et RuntimeException

En Java, il existe deux grandes catégories d’exceptions : les **exceptions vérifiées** (checked exceptions) et les **exceptions non vérifiées** (unchecked exceptions). Cette distinction est essentielle pour comprendre la gestion des erreurs en Java.

### Les exceptions vérifiées (Checked Exceptions)

- **Héritent de la classe `Exception`** (mais pas de `RuntimeException`)
- **Doivent être obligatoirement gérées** par le développeur avec :
  - Un bloc `try-catch`, OU
  - Une déclaration `throws` dans la signature de la méthode
- **Vérifiées à la compilation** : le programme ne compile pas si elles ne sont pas gérées
- **Représentent des erreurs prévisibles** dont l’application peut potentiellement se remettre

**Exemple concret avec FileNotFoundException :**

```java
import java.io.*;
public class CheckedExceptionExample {
    // Cette méthode DOIT déclarer l'exception ou la gérer
    public void readFile(String fileName) throws FileNotFoundException {
        FileReader file = new FileReader(fileName); // Peut lever FileNotFoundException
        // Si le fichier n'existe pas, une exception sera levée
    }
    // OU alors on peut la gérer directement :
    public void readFileWithHandling(String fileName) {
        try {
            FileReader file = new FileReader(fileName);
            System.out.println("File opened successfully!");
        } catch (FileNotFoundException e) {
            System.out.println("Erreur : Le fichier '" + fileName + "' n'existe pas.");
            // L'application peut continuer à fonctionner
        }
    }
}
```

### Les exceptions non vérifiées (Unchecked Exceptions)

- **Héritent de la classe `RuntimeException`** (qui elle-même hérite d'`Exception`)
- **Peuvent être gérées, mais ce n’est pas obligatoire** : le compilateur ne force pas leur gestion
- **Ne sont vérifiées qu’à l’exécution**
- **Représentent généralement des erreurs de programmation** (bugs logiques, erreurs de conception)

**Exemple concret avec NullPointerException et ArrayIndexOutOfBoundsException :**

```java
public class RuntimeExceptionExample {
    public void exampleNullPointer() {
        String text = null;
        // Cette ligne va lever une NullPointerException
        int length = text.length(); 
    }
    public void exampleArrayIndex() {
        int[] array = {1, 2, 3};
        // Cette ligne va lever une ArrayIndexOutOfBoundsException
        int value = array[5]; // Index invalide !
    }
    // On PEUT choisir de les gérer si on le souhaite :
    public void exampleWithHandling() {
        String text = null;
        try {
            int length = text.length();
        } catch (NullPointerException e) {
            System.out.println("Attention : variable nulle détectée !");
        }
    }
}
```

### Hiérarchie des exceptions en Java

```
Throwable
├── Error (erreurs système graves, non récupérables)
└── Exception
    ├── RuntimeException (unchecked)
    │   ├── NullPointerException
    │   ├── ArrayIndexOutOfBoundsException
    │   ├── IllegalArgumentException
    │   └── ...
    └── Checked Exceptions
        ├── IOException
        │   └── FileNotFoundException
        ├── SQLException
        ├── ClassNotFoundException
        └── ...
```

> **À savoir** : Les erreurs (`Error`) sont des problèmes graves (ex : mémoire insuffisante) que l’on ne cherche généralement pas à gérer.

### Exemple pratique complet

Voici un exemple qui illustre clairement la différence :

```java
import java.io.*;
import java.util.Scanner;
public class ExceptionComparison {
    public static void main(String[] args) {
        ExceptionComparison demo = new ExceptionComparison();
        // Exemple d'exception vérifiée
        demo.testCheckedException();
        // Exemple d'exception non vérifiée
        demo.testRuntimeException();
    }
    // Exception vérifiée : OBLIGÉ de la déclarer ou de la gérer
    public void testCheckedException() {
        try {
            // FileNotFoundException est une exception vérifiée
            FileReader file = new FileReader("nonexistent_file.txt");
        } catch (FileNotFoundException e) {
            System.out.println("File not found - application continues normally");
        }
        // Sans le try-catch OU sans "throws FileNotFoundException", 
        // le code ne compilerait même pas !
    }
    // RuntimeException : PAS obligé de la gérer
    public void testRuntimeException() {
        String[] array = {"Java", "is", "awesome"};
        // Cette ligne peut lever ArrayIndexOutOfBoundsException
        try {
            System.out.println(array[10]); // Index invalide
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Index de tableau invalide - erreur de programmation");
        }
        // On pourrait aussi ne pas mettre de try-catch du tout,
        // le programme compilerait quand même (mais planterait à l'exécution)
    }
}
```

---

### Quand utiliser quoi ?

> **Utilisez les exceptions vérifiées** quand :
> - L’erreur est prévisible et externe à votre contrôle (fichier manquant, problème réseau, etc.)
> - L’application peut potentiellement récupérer de l’erreur
> - Vous voulez forcer les utilisateurs de votre méthode à gérer l’exception

> **Les RuntimeException sont appropriées** quand :
> - L’erreur représente un bug de programmation (paramètre null inattendu, index invalide, etc.)
> - L’erreur indique un état incohérent qui ne devrait jamais arriver si le code est correct
> - L’erreur est généralement fatale et difficile à récupérer

Cette distinction aide à créer du code plus robuste et expressif : les exceptions vérifiées documentent les cas d’erreur que les appelants doivent considérer, tandis que les RuntimeException signalent des bugs qui doivent être corrigés plutôt que gérés.

> **Pour aller plus loin** : Essayez de provoquer différentes exceptions dans vos programmes, puis entraînez-vous à les gérer proprement avec des blocs try-catch adaptés !



## Propagation et gestion avancée des exceptions

Il est possible qu’une exception ne soit pas gérée immédiatement là où elle se produit, mais qu’elle « remonte » la pile d’appels jusqu’à un niveau où elle sera prise en charge. On peut aussi choisir de la gérer partiellement, puis de la relancer (rethrow) pour qu’un autre niveau s’en occupe.

Voici un exemple illustrant la propagation et le rethrow d’une exception :

```java
public class PropagationExceptionDemo {
    public static void main(String[] args) {
        try {
            level1();
        } catch (Exception e) {
            System.out.println("Exception caught in main: " + e.getMessage());
        }
    }
    static void level1() throws Exception {
        try {
            level2();
        } catch (Exception e) {
            System.out.println("Exception caught in level1, rethrowing...");
            throw e; // rethrow
        }
    }
    static void level2() throws Exception {
        throw new Exception("Error occurred in level2");
    }
}
```

> **À retenir** : Une exception peut être capturée à n’importe quel niveau de la pile d’appels. On peut choisir de la traiter, de la relancer, ou de la transformer en une autre exception plus explicite.

## Créer ses propres exceptions

En Java, il est possible (et souvent recommandé) de créer ses propres classes d’exceptions pour représenter des erreurs spécifiques à votre application. Pour cela, il suffit d’étendre la classe `Exception` (pour une exception vérifiée) ou `RuntimeException` (pour une exception non vérifiée).

Voici un exemple de création d’une exception personnalisée :

```java
// Exception personnalisée qui hérite d'Exception (checked exception)
public class InvalidUserInputException extends Exception {
    // Constructeur simple
    public InvalidUserInputException(String message) {
        super(message);
    }
    // Constructeur avec cause (pour chaîner les exceptions)
    public InvalidUserInputException(String message, Throwable cause) {
        super(message, cause);
    }
}
```

> **Info** : L’argument `cause` permet de conserver la trace de l’exception d’origine. Cela facilite le débogage, car on peut remonter toute la chaîne d’exceptions jusqu’à la source du problème.

Vous pouvez ensuite utiliser votre exception personnalisée dans votre code :

```java
public void processUserInput(String input) throws InvalidUserInputException {
    try {
        int value = Integer.parseInt(input);
        // Traitement normal
    } catch (NumberFormatException e) {
        // On relance une exception métier en gardant la cause d'origine
        throw new InvalidUserInputException("Input is not a valid integer", e);
    }
}
```

Dans cet exemple, si l’utilisateur saisit une valeur non entière, une `NumberFormatException` sera levée. On la capture et on relance une exception métier plus explicite (`InvalidUserInputException`), tout en conservant la cause d’origine grâce à l’argument `cause`.

> **À retenir** : Créer ses propres exceptions permet de rendre le code plus lisible, de mieux documenter les erreurs possibles, et de faciliter le suivi des causes lors du débogage.

### Affichage de la trace complète avec `printStackTrace()`

Lorsque vous utilisez une exception personnalisée avec une cause, la méthode `printStackTrace()` affiche toute la chaîne des exceptions, de la plus récente à la cause d’origine. Cela permet de comprendre précisément l’enchaînement des erreurs.

Voici un exemple :

```java
public class StackTraceDemo {
    public static void main(String[] args) {
        try {
            processUserInput("abc");
        } catch (InvalidUserInputException e) {
            e.printStackTrace(); // Affiche la trace complète, y compris la cause
        }
    }

    public static void processUserInput(String input) throws InvalidUserInputException {
        try {
            int value = Integer.parseInt(input);
        } catch (NumberFormatException e) {
            throw new InvalidUserInputException("Input is not a valid integer", e);
        }
    }
}
```

La sortie de `printStackTrace()` ressemblera à :

```
InvalidUserInputException: Input is not a valid integer
    at StackTraceDemo.processUserInput(StackTraceDemo.java:12)
    at StackTraceDemo.main(StackTraceDemo.java:6)
Caused by: java.lang.NumberFormatException: For input string: "abc"
    at java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
    ...
```

> **À retenir** : Grâce à l’argument `cause` et à `printStackTrace()`, on peut remonter toute la chaîne des erreurs, ce qui facilite grandement le débogage.


## Exemple réel : gestion et propagation d’exceptions dans une application

Prenons un cas concret d’application qui lit un fichier, analyse son contenu et affiche le résultat à l’utilisateur. On va illustrer :
- une exception qui traverse plusieurs couches sans être gérée,
- une exception gérée puis relancée (rethrow),
- une exception capturée et transformée en une autre exception plus explicite.

```java
import java.io.*;
// Exception personnalisée pour l'analyse
class AnalysisException extends Exception {
    public AnalysisException(String message, Throwable cause) {
        super(message, cause);
    }
}

public class ApplicationDemo {
    public static void main(String[] args) {
        try {
            processFile("data.txt");
        } catch (AnalysisException e) {
            System.out.println("Analysis error: " + e.getMessage());
            System.out.println("Initial cause: " + e.getCause());
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }

    // 1. Cette méthode ne gère pas FileNotFoundException, elle la laisse remonter
    static void processFile(String fileName) throws FileNotFoundException, AnalysisException {
        String line = readFirstLine(fileName); // Peut lever FileNotFoundException ou AnalysisException
        System.out.println("Line read: " + line);
    }

    // 2. Cette méthode gère IOException, la transforme en exception métier
    static String readFirstLine(String fileName) throws AnalysisException, FileNotFoundException {
        try (BufferedReader br = new BufferedReader(new FileReader(fileName))) {
            String line = br.readLine();
            if (line == null) throw new AnalysisException("Empty file", null);
            analyzeLine(line); // Peut lever AnalysisException
            return line;
        } catch (IOException e) {
            // On transforme IOException en exception métier plus explicite
            throw new AnalysisException("File access error", e);
        }
    }

    // 3. Cette méthode gère partiellement l'exception, puis la relance
    static void analyzeLine(String line) throws AnalysisException {
        try {
            if (line.length() < 5) throw new IllegalArgumentException("Line too short");
            // Analyse fictive...
        } catch (IllegalArgumentException e) {
            System.out.println("Error detected in analyzeLine, rethrowing as AnalysisException");
            throw new AnalysisException("Analysis impossible: " + e.getMessage(), e);
        }
    }
}
```

- Ici, `FileNotFoundException` traverse toutes les couches jusqu’à `main` sans être gérée.
- Une erreur d’analyse (`IllegalArgumentException`) est capturée, puis transformée en `AnalysisException` (exception métier).
- Une erreur d’accès au fichier (`IOException`) est capturée et transformée en `AnalysisException`.

> **À retenir** : Dans une application réelle, il est courant de laisser certaines exceptions traverser plusieurs couches, d’en relancer d’autres, ou de les transformer pour donner plus de sens au contexte métier.

