# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



<!-- Beat Template
    {
        id: "step-1",
        title: "Substances / Materials",
        beats: [
       {
         narration:
           "They’re made of different substances or materials.\nFor example, a chair might be made of wood or metal.\nClothes are made of fabric.\nPaper is made from wood.\nAnd air — even though it’s invisible — is still a material.",
         reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
         focus: "n2",
         images: ["/images/materials-collage-wood-metal-fabric-paper-air.png"],
       },
       {
         narration: "So substances and materials can be solid, liquid, or gas.",
         reveal: { nodes: ["n1", "n2"], edges: ["n1-n2"] },
         focus: "n2",
         images: [],//  optional, but explicit
         question: {
           prompt: "Particles can be what?",
           options: ["Atoms", "Molecules", "Atoms or molecules"],
           correctIndex: 2,
           feedback: {
             correct: "✅ Nice! Particles can be atoms or molecules.",
             incorrect: "❌ Not quite. Remember: molecules are made of atoms, and atoms can exist alone too.",
           },
         },
       }, -->