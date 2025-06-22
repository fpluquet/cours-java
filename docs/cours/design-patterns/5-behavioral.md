# Behavioral Design Patterns

Les patterns comportementaux facilitent la communication entre objets et la répartition des responsabilités. Ils permettent de rendre les interactions plus souples, découplées et évolutives.

> **Info :**
> Utilisez ces patterns pour organiser la logique métier et la communication entre objets sans créer de dépendances fortes.

## Observer
Le pattern Observer permet à un objet (le sujet) de notifier automatiquement ses observateurs lorsqu'un changement d'état survient. Cela permet de mettre en place des systèmes réactifs et découplés.

**Diagramme de classe :**
```mermaid
classDiagram
    class Sujet {
        +ajouter(Observateur)
        +notifier()
        +changerEtat(etat)
    }
    class Observateur {
        <<interface>>
        +actualiser(etat)
    }
    class ObservateurConcret {
        +actualiser(etat)
    }
    Sujet --> Observateur : notifie
    Observateur <|.. ObservateurConcret
```
**Explication :**
- `Sujet` gère la liste des observateurs et notifie les changements.
- `Observateur` est une interface que doivent implémenter tous les observateurs.
- `ObservateurConcret` réagit aux notifications du sujet.

**Quand l'utiliser ?**
- Quand plusieurs objets doivent réagir à un changement d'état d'un autre objet (ex : interface graphique, notifications).

**Exemple Java**
```java
import java.util.*;
interface Observateur {
    void actualiser(String etat);
}
class Sujet {
    private List<Observateur> obs = new ArrayList<>();
    private String etat;
    public void ajouter(Observateur o) { obs.add(o); }
    public void notifier() {
        for (Observateur o : obs) o.actualiser(etat);
    }
    public void changerEtat(String e) {
        etat = e;
        notifier();
    }
}
class ObservateurConcret implements Observateur {
    public void actualiser(String etat) {
        System.out.println("Nouvel état : " + etat);
    }
}
// Utilisation
Sujet sujet = new Sujet();
Observateur o = new ObservateurConcret();
sujet.ajouter(o);
sujet.changerEtat("Nouveau!");
```

> **À retenir :**
> L'observateur permet de réagir automatiquement à des changements sans couplage fort.

## Strategy
Permet de changer dynamiquement l'algorithme utilisé par un objet.

**Diagramme de classe :**
```mermaid
classDiagram
    class Strategie {
        <<interface>>
        +operation(a, b)
    }
    class Addition {
        +operation(a, b)
    }
    class Contexte {
        -strategie: Strategie
        +executer(a, b)
    }
    Strategie <|.. Addition
    Contexte --> Strategie : utilise
```
**Explication :**
- `Strategie` définit l'interface des algorithmes interchangeables.
- `Addition` est une implémentation concrète d'une stratégie.
- `Contexte` utilise une stratégie pour exécuter une opération.

**Quand l'utiliser ?**
- Quand plusieurs algorithmes sont interchangeables pour une même tâche.

**Exemple Java**
```java
interface Strategie {
    int operation(int a, int b);
}
class Addition implements Strategie {
    public int operation(int a, int b) { return a + b; }
}
class Contexte {
    private Strategie strategie;
    public Contexte(Strategie s) { strategie = s; }
    public int executer(int a, int b) { return strategie.operation(a, b); }
}
// Utilisation
Contexte c = new Contexte(new Addition());
System.out.println(c.executer(2, 3)); // 5
```

## Command
Encapsule une requête comme un objet, permettant de paramétrer des actions, les annuler, les mettre en file, etc.

**Diagramme de classe :**
```mermaid
classDiagram
    class Commande {
        <<interface>>
        +executer()
    }
    class AllumerLumiere {
        +executer()
    }
    class Lumiere {
        +allumer()
    }
    Commande <|.. AllumerLumiere
    AllumerLumiere --> Lumiere : agit sur
```
**Explication :**
- `Commande` définit l'interface des commandes.
- `AllumerLumiere` est une commande concrète qui agit sur `Lumiere`.
- `Lumiere` est le récepteur de la commande.

**Quand l'utiliser ?**
- Pour implémenter des actions annulables, des files de commandes, ou des menus dynamiques.

**Exemple Java**
```java
interface Commande {
    void executer();
}
class Lumiere {
    public void allumer() { System.out.println("Lumière allumée"); }
}
class AllumerLumiere implements Commande {
    private Lumiere lumiere;
    public AllumerLumiere(Lumiere l) { lumiere = l; }
    public void executer() { lumiere.allumer(); }
}
// Utilisation
Lumiere l = new Lumiere();
Commande cmd = new AllumerLumiere(l);
cmd.executer();
```

## State
Permet à un objet de changer de comportement lorsque son état interne change.

**Diagramme de classe :**
```mermaid
classDiagram
    class Etat {
        <<interface>>
        +action(Context)
    }
    class EtatA {
        +action(Context)
    }
    class EtatB {
        +action(Context)
    }
    class Context {
        -etat: Etat
        +setEtat(Etat)
        +demande()
    }
    Etat <|.. EtatA
    Etat <|.. EtatB
    Context --> Etat : délègue
```
**Explication :**
- `Etat` définit l'interface des états.
- `EtatA` et `EtatB` sont des états concrets.
- `Context` délègue son comportement à l'état courant.

**Quand l'utiliser ?**
- Quand un objet doit changer de comportement dynamiquement selon son état.

**Exemple Java**
```java
interface Etat {
    void action(Context c);
}
class EtatA implements Etat {
    public void action(Context c) {
        System.out.println("Etat A");
        c.setEtat(new EtatB());
    }
}
class EtatB implements Etat {
    public void action(Context c) {
        System.out.println("Etat B");
    }
}
class Context {
    private Etat etat;
    public Context() { etat = new EtatA(); }
    public void setEtat(Etat e) { etat = e; }
    public void demande() { etat.action(this); }
}
// Utilisation
Context ctx = new Context();
ctx.demande(); // Etat A
ctx.demande(); // Etat B
```

## Chain of Responsibility
Permet de passer une requête à travers une chaîne d'objets jusqu'à ce qu'un objet la traite.

**Diagramme de classe :**
```mermaid
classDiagram
    class Handler {
        -suivant: Handler
        +setSuivant(Handler)
        +traiter(requete)
    }
    class HandlerA {
        +traiter(requete)
    }
    class HandlerB {
        +traiter(requete)
    }
    Handler <|.. HandlerA
    Handler <|.. HandlerB
    Handler --> Handler : suivant
```
**Explication :**
- `Handler` définit l'interface et la gestion du suivant.
- `HandlerA` et `HandlerB` sont des maillons concrets de la chaîne.
- Chaque handler peut traiter ou passer la requête au suivant.

**Quand l'utiliser ?**
- Quand plusieurs objets peuvent traiter une requête, mais on ne sait pas lequel à l'avance.

**Exemple Java**
```java
abstract class Handler {
    protected Handler suivant;
    public void setSuivant(Handler s) { suivant = s; }
    public abstract void traiter(String requete);
}
class HandlerA extends Handler {
    public void traiter(String requete) {
        if (requete.equals("A")) System.out.println("Traité par A");
        else if (suivant != null) suivant.traiter(requete);
    }
}
class HandlerB extends Handler {
    public void traiter(String requete) {
        if (requete.equals("B")) System.out.println("Traité par B");
        else if (suivant != null) suivant.traiter(requete);
    }
}
// Utilisation
Handler h1 = new HandlerA();
Handler h2 = new HandlerB();
h1.setSuivant(h2);
h1.traiter("B"); // Traité par B
```

## Iterator
Permet de parcourir une collection sans exposer sa structure interne.

**Diagramme de classe :**
```mermaid
classDiagram
    class Iterator {
        <<interface>>
        +hasNext()
        +next()
    }
    class Collection {
        +iterator()
    }
    Collection --> Iterator : crée
```
**Explication :**
- `Iterator` définit les méthodes de parcours.
- `Collection` fournit un itérateur pour parcourir ses éléments.

**Quand l'utiliser ?**
- Pour parcourir des collections de manière uniforme.

**Exemple Java**
```java
List<String> liste = new ArrayList<>();
liste.add("a"); liste.add("b");
Iterator<String> it = liste.iterator();
while (it.hasNext()) {
    System.out.println(it.next());
}
```

## Mediator
Le pattern Mediator centralise la communication entre plusieurs objets pour réduire les dépendances directes.

**Diagramme de classe :**
```mermaid
classDiagram
    class Mediator {
        <<interface>>
        +notifier(sender, event)
    }
    class ConcreteMediator {
        +notifier(sender, event)
        -collegueA: CollegueA
        -collegueB: CollegueB
    }
    class Collegue {
        <<abstract>>
        +envoyer(event)
        -mediator: Mediator
    }
    class CollegueA
    class CollegueB
    Mediator <|.. ConcreteMediator
    Collegue <|-- CollegueA
    Collegue <|-- CollegueB
    Collegue --> Mediator
    ConcreteMediator --> CollegueA
    ConcreteMediator --> CollegueB
```
**Explication :**
- `Mediator` définit l'interface de communication.
- `ConcreteMediator` centralise les échanges entre collègues.
- `Collegue` est une classe abstraite pour les objets qui communiquent via le médiateur.

**Exemple Java**
```java
interface Mediator {
    void notifier(Collegue sender, String event);
}
class ConcreteMediator implements Mediator {
    CollegueA a;
    CollegueB b;
    public void setA(CollegueA a) { this.a = a; }
    public void setB(CollegueB b) { this.b = b; }
    public void notifier(Collegue sender, String event) {
        if (sender == a) b.reagir(event);
        else if (sender == b) a.reagir(event);
    }
}
abstract class Collegue {
    protected Mediator mediator;
    public Collegue(Mediator m) { mediator = m; }
    public void envoyer(String event) { mediator.notifier(this, event); }
    public abstract void reagir(String event);
}
class CollegueA extends Collegue {
    public CollegueA(Mediator m) { super(m); }
    public void reagir(String event) { System.out.println("A reçoit: " + event); }
}
class CollegueB extends Collegue {
    public CollegueB(Mediator m) { super(m); }
    public void reagir(String event) { System.out.println("B reçoit: " + event); }
}
```

## Memento
Permet de sauvegarder et restaurer l'état interne d'un objet sans violer son encapsulation.

**Diagramme de classe :**
```mermaid
classDiagram
    class Originator {
        +setEtat(etat)
        +sauvegarder()
        +restaurer(Memento)
    }
    class Memento {
        -etat
    }
    class Caretaker {
        -memento: Memento
    }
    Originator --> Memento : crée
    Caretaker --> Memento : stocke
```
**Explication :**
- `Originator` crée et restaure des objets `Memento`.
- `Memento` stocke l'état interne.
- `Caretaker` garde les mementos sans les modifier.

**Exemple Java**
```java
class Memento {
    private String etat;
    public Memento(String e) { etat = e; }
    public String getEtat() { return etat; }
}
class Originator {
    private String etat;
    public void setEtat(String e) { etat = e; }
    public Memento sauvegarder() { return new Memento(etat); }
    public void restaurer(Memento m) { etat = m.getEtat(); }
}
class Caretaker {
    private Memento memento;
    public void setMemento(Memento m) { memento = m; }
    public Memento getMemento() { return memento; }
}
```

## Template Method
Définit le squelette d'un algorithme dans une méthode, en laissant certaines étapes à des sous-classes.

**Diagramme de classe :**
```mermaid
classDiagram
    class AbstractClass {
        +templateMethod()
        +etape1()
        +etape2()
    }
    class ConcreteClassA
    class ConcreteClassB
    AbstractClass <|.. ConcreteClassA
    AbstractClass <|.. ConcreteClassB
```
**Explication :**
- `AbstractClass` définit la méthode template et les étapes.
- Les sous-classes implémentent les étapes spécifiques.

**Exemple Java**
```java
abstract class Recette {
    public final void preparer() {
        etape1();
        etape2();
    }
    abstract void etape1();
    abstract void etape2();
}
class RecetteGateau extends Recette {
    void etape1() { System.out.println("Mélanger"); }
    void etape2() { System.out.println("Cuire"); }
}
```

## Visitor
Permet de séparer un algorithme d'une structure d'objets sur laquelle il opère.

**Diagramme de classe :**
```mermaid
classDiagram
    class Element {
        <<interface>>
        +accepter(Visitor)
    }
    class ElementConcretA
    class ElementConcretB
    class Visitor {
        <<interface>>
        +visiter(ElementConcretA)
        +visiter(ElementConcretB)
    }
    class VisitorConcret
    Element <|.. ElementConcretA
    Element <|.. ElementConcretB
    Visitor <|.. VisitorConcret
    Element --> Visitor : accepter
```
**Explication :**
- `Element` accepte un visiteur.
- `Visitor` définit les opérations à effectuer sur chaque type d'élément.

**Exemple Java**
```java
interface Visitor {
    void visiter(ElementConcretA a);
    void visiter(ElementConcretB b);
}
interface Element {
    void accepter(Visitor v);
}
class ElementConcretA implements Element {
    public void accepter(Visitor v) { v.visiter(this); }
}
class ElementConcretB implements Element {
    public void accepter(Visitor v) { v.visiter(this); }
}
```



## Double Dispatch
Le double dispatch est un mécanisme qui permet de choisir dynamiquement quelle méthode exécuter en fonction **de deux types** à l'exécution (généralement le type de l'objet et celui d'un argument). En Java, le simple dispatch (liaison dynamique sur l'objet cible) est la règle, mais le double dispatch est simulé via certains patterns, notamment le Visitor.

### Pourquoi le double dispatch ?
Dans le simple dispatch, seule la classe de l'objet sur lequel on invoque la méthode détermine la méthode appelée. Mais parfois, on veut que le comportement dépende **à la fois** du type de l'objet ET du type d'un argument : c'est le double dispatch.

### Exemple sans double dispatch
```java
class Animal {
    void interagir(Animal a) {
        System.out.println("Animal rencontre Animal");
    }
}
class Chat extends Animal {
    void interagir(Animal a) {
        System.out.println("Chat rencontre Animal");
    }
}
class Chien extends Animal {
    void interagir(Animal a) {
        System.out.println("Chien rencontre Animal");
    }
}
// ...
Animal a1 = new Chat();
Animal a2 = new Chien();
a1.interagir(a2); // Affiche "Chat rencontre Animal" (et non "Chat rencontre Chien")
```
Ici, seule la classe de `a1` compte, pas celle de `a2`.

### Double dispatch sans visiteur
Voici un exemple de double dispatch pur, sans utiliser le pattern Visitor, mais en utilisant la délégation d'appels pour simuler le double dispatch. Cet exemple montre comment deux objets peuvent interagir en fonction de leurs types respectifs, sans avoir besoin de tests de type explicites.

```java
abstract class Animal {
    abstract void interagir(Animal autre);
    abstract void interagirAvecChat(Chat chat);
    abstract void interagirAvecChien(Chien chien);
}
class Chat extends Animal {
    void interagir(Animal autre) {
        autre.interagirAvecChat(this);
    }
    void interagirAvecChat(Chat chat) {
        System.out.println("Deux chats se croisent : indifférence.");
    }
    void interagirAvecChien(Chien chien) {
        System.out.println("Le chat griffe le chien !");
    }
}
class Chien extends Animal {
    void interagir(Animal autre) {
        autre.interagirAvecChien(this);
    }
    void interagirAvecChat(Chat chat) {
        System.out.println("Le chien aboie sur le chat !");
    }
    void interagirAvecChien(Chien chien) {
        System.out.println("Deux chiens se reniflent.");
    }
}
// Utilisation
Animal a1 = new Chat();
Animal a2 = new Chien();
a1.interagir(a2); // Affiche "Le chat griffe le chien !"
a2.interagir(a1); // Affiche "Le chien aboie sur le chat !"
```
Ici, le double dispatch est obtenu sans aucun test de type, uniquement par la délégation des appels.

**Diagramme de séquence :**
```mermaid
sequenceDiagram
    participant main as main:Main
    participant a1 as a1:Chat
    participant a2 as a2:Chien

    main->>a1: interagir(a2)
    a1->>a2: interagirAvecChat(a1)
    a2-->>a1: (retour)
    a1-->>main: (retour)
    Note right of main: Affiche "Le chat griffe le chien !"

    main->>a2: interagir(a1)
    a2->>a1: interagirAvecChien(a2)
    a1-->>a2: (retour)
    a2-->>main: (retour)
    Note right of main: Affiche "Le chien aboie sur le chat !"
```
Ce diagramme montre comment l'appel est délégué à l'autre objet pour obtenir le double dispatch, et comment le comportement dépend des deux types dynamiques.

### Double dispatch avec Visitor
Pour obtenir un comportement dépendant des deux types, on utilise le Visitor :
```java
interface Animal {
    void accepter(Interaction v);
}
class Chat implements Animal {
    public void accepter(Interaction v) { v.interagirAvecChat(this); }
}
class Chien implements Animal {
    public void accepter(Interaction v) { v.interagirAvecChien(this); }
}
interface Interaction {
    void interagirAvecChat(Chat c);
    void interagirAvecChien(Chien c);
}
class InteractionConcret implements Interaction {
    public void interagirAvecChat(Chat c) {
        System.out.println("On rencontre un chat");
    }
    public void interagirAvecChien(Chien c) {
        System.out.println("On rencontre un chien");
    }
}

class FaireParlerInteraction implements Interaction {
    public void interagirAvecChat(Chat c) {
        System.out.println("Le chat miaule");
    }
    public void interagirAvecChien(Chien c) {
        System.out.println("Le chien aboie");
    }
}
// Utilisation
Animal a1 = new Chat();
Animal a2 = new Chien();
Interaction interaction = new InteractionConcret();
a1.accepter(interaction); // Affiche "On rencontre un chat"
a2.accepter(interaction); // Affiche "On rencontre un chien"

// Avec une autre interaction
Interaction interactionParler = new FaireParlerInteraction();
a1.accepter(interactionParler); // Affiche "Le chat miaule"
a2.accepter(interactionParler); // Affiche "Le chien aboie"
```
Ici, le type dynamique de `a1` et de `a2` sont tous deux pris en compte.

**Diagramme de séquence :**
```mermaid
sequenceDiagram
    participant main as main:Main
    participant a1 as a1:Chat
    participant a2 as a2:Chien
    participant interaction as interaction:InteractionConcret

    main->>a1: accepter(interaction)
    a1->>interaction: interagirAvecChat(a1)
    interaction-->>a1: (retour)
    a1-->>main: (retour)
    Note right of main: Affiche "On rencontre un chat"

    main->>a2: accepter(interaction)
    a2->>interaction: interagirAvecChien(a2)
    interaction-->>a2: (retour)
    a2-->>main: (retour)
    Note right of main: Affiche "On rencontre un chien"
```

```mermaid
sequenceDiagram
    participant main as main:Main
    participant a1 as a1:Chat
    participant a2 as a2:Chien
    participant interactionParler as interactionParler:FaireParlerInteraction

    main->>a1: accepter(interactionParler)
    a1->>interactionParler: interagirAvecChat(a1)
    interactionParler-->>a1: (retour)
    a1-->>main: (retour)
    Note right of main: Affiche "Le chat miaule"

    main->>a2: accepter(interactionParler)
    a2->>interactionParler: interagirAvecChien(a2)
    interactionParler-->>a2: (retour)
    a2-->>main: (retour)
    Note right of main: Affiche "Le chien aboie"
```

On voit ici que l'action est déterminée par le type de l'objet et le type de l'interaction, permettant ainsi un comportement flexible et extensible.

> **À retenir :**
> Le double dispatch permet de gérer des interactions complexes entre types, en déléguant la logique de décision à des classes spécifiques. Cela rend le code plus flexible et extensible, car on peut ajouter de nouveaux types d'interactions sans modifier les classes existantes.



> **À retenir :**
> Ces patterns avancés permettent de structurer des systèmes complexes et évolutifs.
