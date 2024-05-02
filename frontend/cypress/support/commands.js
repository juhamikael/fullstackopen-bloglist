// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add("createBlog", ({ title, author, url }) => {
  cy.get("#new-blog-trigger").click();
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#url").type(url);
  cy.get("#submit-blog-btn").click();
  cy.get("#close-dialog-btn").click();
  cy.contains(`a new blog ${title} by ${author} added`);
  cy.contains(title);
  cy.contains(author);
});

Cypress.Commands.add("getBlogLikesAndTitle", (index, blogPosts) => {
  cy.get(`#blog-list > :nth-child(${index})`).within(() => {
    cy.get("#likes-count")
      .invoke("text")
      .then((text) => {
        blogPosts[index].likes = parseInt(text);
      });
    cy.get("#blog-title")
      .invoke("text")
      .then((text) => {
        blogPosts[index].id = text;
      });
  });
});

Cypress.Commands.add("userLogin", ({ username, password }) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
  cy.get("#logged-in-user-name").should("contain", username);
});
