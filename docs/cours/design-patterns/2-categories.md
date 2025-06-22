# Différentes catégories de Design Patterns

Les design patterns sont classés en trois grandes familles, chacune répondant à des besoins spécifiques dans la conception logicielle.

::: info
Comprendre à quelle famille appartient un pattern aide à choisir la bonne solution selon le problème rencontré.
:::

## 1. Patterns de création (Creational Patterns)
Ils concernent la manière de créer des objets, en masquant la logique de création et en rendant le système indépendant de la façon dont ses objets sont créés, composés et représentés.

**Exemples :**
- [**Singleton**](3-creational.md#singleton) : Garantit une seule instance d'une classe.
- [**Factory Method**](3-creational.md#factory-method) : Délègue la création d'objets à des sous-classes.
- [**Abstract Factory**](3-creational.md#abstract-factory) : Crée des familles d'objets liés.
- [**Builder**](3-creational.md#builder) : Construit des objets complexes étape par étape.
- [**Prototype**](3-creational.md#prototype) : Clone des objets existants.

## 2. Patterns structurels (Structural Patterns)
Ils concernent la composition des classes et des objets, facilitant la conception de structures flexibles et efficaces.

**Exemples :**
- [**Adapter**](4-structural.md#adapter) : Rend compatibles des interfaces différentes.
- [**Bridge**](4-structural.md#bridge) : Sépare abstraction et implémentation.
- [**Composite**](4-structural.md#composite) : Structure des objets en arbre.
- [**Decorator**](4-structural.md#decorator) : Ajoute dynamiquement des fonctionnalités.
- [**Facade**](4-structural.md#facade) : Simplifie l'accès à un sous-système complexe.
- [**Flyweight**](4-structural.md#flyweight) : Partage des objets pour économiser de la mémoire.
- [**Proxy**](4-structural.md#proxy) : Contrôle l'accès à un objet.

## 3. Patterns comportementaux (Behavioral Patterns)
Ils concernent la communication et la répartition des responsabilités entre les objets.

**Exemples :**
- [**Observer**](5-behavioral.md#observer) : Notifie automatiquement les changements d'état.
- [**Strategy**](5-behavioral.md#strategy) : Permute dynamiquement des algorithmes.
- [**Command**](5-behavioral.md#command) : Encapsule des requêtes comme objets.
- [**State**](5-behavioral.md#state) : Change le comportement selon l'état interne.
- [**Chain of Responsibility**](5-behavioral.md#chain-of-responsibility) : Passe une requête à travers une chaîne d'objets.
- [**Iterator**](5-behavioral.md#iterator) : Parcourt une collection sans exposer sa structure.
- [**Mediator**](5-behavioral.md#mediator), [**Memento**](5-behavioral.md#memento), [**Template Method**](5-behavioral.md#template-method), [**Visitor**](5-behavioral.md#visitor), [**Interpreter**](5-behavioral.md#interpreter) : Autres patterns avancés.

::: tip
À retenir : Chaque famille répond à une problématique différente : création, structure ou comportement.
:::

Chacune de ces familles sera détaillée dans les fichiers suivants, avec des exemples concrets en Java.
