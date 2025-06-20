import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";


export default withMermaid({
  title: 'Cours de Java',
  description: 'Support de cours Java, JavaFX, MVC et Design Patterns',
  themeConfig: {
    sidebar: [
      {
        text: 'Cours de Java',
        items: [
          {
            text: 'Java',
            items: [
              { text: 'Introduction', link: '/cours/java/1-introduction' },
              { text: 'Quelques classes utiles', link: '/cours/java/2-quelques-classes-utiles' },
              { text: 'Méthode main', link: '/cours/java/3-methode-main' },
              { text: 'Types', link: '/cours/java/4-types' },
              { text: 'Boucles', link: '/cours/java/5-boucles' },
              { text: 'Constantes', link: '/cours/java/6-constantes' },
              { text: 'Méthodes', link: '/cours/java/7-methodes' },
              { text: 'Classes', link: '/cours/java/8-classes' },
              { text: 'Objets', link: '/cours/java/9-objets' },
              { text: 'Exceptions', link: '/cours/java/10-exceptions' },
              { text: 'Garbage collector', link: '/cours/java/11-garbage-collector' },
              { text: 'Tableaux', link: '/cours/java/12-tableaux' },
              { text: 'ArrayList', link: '/cours/java/13-arraylist' },
              { text: 'Héritage', link: '/cours/java/14-heritage' },
              { text: 'Interfaces', link: '/cours/java/15-interfaces' },
              { text: 'Classes anonymes', link: '/cours/java/16-classes-anonymes' },
              { text: 'Classes internes', link: '/cours/java/17-classes-internes' },
              { text: 'Génériques', link: '/cours/java/18-generiques' },
              { text: 'Lambda', link: '/cours/java/19-lambda' },
              { text: 'Fichiers', link: '/cours/java/20-fichiers' },
              { text: 'SOLID', link: '/cours/java/21-solid' },
            ]
          },
          {
            text: 'JavaFX',
            items: [
              { text: "JavaFX, c'est quoi ?", link: '/cours/javafx/1-javafx-cest-quoi' },
              { text: 'Main, Application, Stage, Scene', link: '/cours/javafx/2-main-application-stage-scene' },
              { text: 'Composants', link: '/cours/javafx/3-composants' },
              { text: 'Layouts', link: '/cours/javafx/4-layouts' },
              { text: 'FXML', link: '/cours/javafx/3-FXML' },
              { text: 'Contrôleur FXML', link: '/cours/javafx/6-fxml-controller' },
              { text: 'Structuration de FXML', link: '/cours/javafx/7-fxml-complex' },
              { text: 'Controllers Factory', link: '/cours/javafx/8-fxml-controllerfactory' },
              { text: 'Multi-threading', link: '/cours/javafx/5-multithreading' },
            ]
          },
          {
            text: 'Architecture MVC',
            items: [
              { text: 'Introduction', link: '/cours/mvc/1-introduction' },
              { text: 'Qualité de code, découplage et cohésion', link: '/cours/mvc/2-qualite-code' },
              { text: "Première approche de l'architecture MVC", link: '/cours/mvc/3-premiere-approche' },
              { text: 'Gestion de différentes vues', link: '/cours/mvc/4-gestion-vues' },
              { text: 'Services', link: '/cours/mvc/5-services' },
              { text: 'Repositories', link: '/cours/mvc/6-repositories' },
            ]
          },
          {
            text: 'Design Patterns',
            items: [
              { text: "Les design patterns, c'est quoi ?", link: '/cours/design-patterns/1-intro' },
              { text: 'Catégories', link: '/cours/design-patterns/2-categories' },
              { text: 'Creational', link: '/cours/design-patterns/3-creational' },
              { text: 'Structural', link: '/cours/design-patterns/4-structural' },
              { text: 'Behavioral', link: '/cours/design-patterns/5-behavioral' },
            ]
          }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: 'deep',
      label: 'Sur cette page'
    },
  }
})
