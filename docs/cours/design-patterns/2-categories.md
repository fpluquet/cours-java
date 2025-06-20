# Différentes catégories de Design Patterns

Les design patterns sont classés en trois grandes familles, chacune répondant à des besoins spécifiques dans la conception logicielle.

> **Info :**
> Comprendre à quelle famille appartient un pattern aide à choisir la bonne solution selon le problème rencontré.

## 1. Patterns de création (Creational Patterns)
Ils concernent la manière de créer des objets, en masquant la logique de création et en rendant le système indépendant de la façon dont ses objets sont créés, composés et représentés.

**Exemples :**
- **Singleton** : Garantit une seule instance d'une classe.
- **Factory Method** : Délègue la création d'objets à des sous-classes.
- **Abstract Factory** : Crée des familles d'objets liés.
- **Builder** : Construit des objets complexes étape par étape.
- **Prototype** : Clone des objets existants.

## 2. Patterns structurels (Structural Patterns)
Ils concernent la composition des classes et des objets, facilitant la conception de structures flexibles et efficaces.

**Exemples :**
- **Adapter** : Rend compatibles des interfaces différentes.
- **Bridge** : Sépare abstraction et implémentation.
- **Composite** : Structure des objets en arbre.
- **Decorator** : Ajoute dynamiquement des fonctionnalités.
- **Facade** : Simplifie l'accès à un sous-système complexe.
- **Flyweight** : Partage des objets pour économiser de la mémoire.
- **Proxy** : Contrôle l'accès à un objet.

## 3. Patterns comportementaux (Behavioral Patterns)
Ils concernent la communication et la répartition des responsabilités entre les objets.

**Exemples :**
- **Observer** : Notifie automatiquement les changements d'état.
- **Strategy** : Permute dynamiquement des algorithmes.
- **Command** : Encapsule des requêtes comme objets.
- **State** : Change le comportement selon l'état interne.
- **Chain of Responsibility** : Passe une requête à travers une chaîne d'objets.
- **Iterator** : Parcourt une collection sans exposer sa structure.
- **Mediator, Memento, Template Method, Visitor, Interpreter** : Autres patterns avancés.

> **À retenir :**
> Chaque famille répond à une problématique différente : création, structure ou comportement.

Chacune de ces familles sera détaillée dans les fichiers suivants, avec des exemples concrets en Java.
