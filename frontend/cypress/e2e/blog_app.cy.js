describe("Note ", () => {
  before(() => {
    cy.request("POST", "http://localhost:3003/api/testing/reset").then(() => {
      const user = {
        name: "test",
        username: "test",
        password: "testFfqwetqwetqw5324dqwsdfq43test",
      };

      const user2 = {
        name: "test2",
        username: "test2",
        password: "testFfqwetqwetqw5324dqwsdfq43test",
      };

      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/users/",
        body: user,
        headers: { "Content-Type": "application/json" },
      });

      cy.request({
        method: "POST",
        url: "http://localhost:3003/api/users/",
        body: user2,
        headers: { "Content-Type": "application/json" },
      });
    });

    cy.visit("http://localhost:5173");
  });

  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  describe("Login", function () {
    it("Login form is shown", function () {
      cy.get("#username").should("exist");
      cy.get("#password").should("exist");
    });

    it("succeeds with correct credentials", function () {
      cy.userLogin({ username: "test", password: "test" });
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong credentials, please try again");
    });
  });

  describe("When logged in", function () {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.createBlog({
        title: "should-be-most-liked",
        author: "more-likes",
        url: "https://google.com",
      });
      cy.createBlog({
        title: "test",
        author: "TestAuthor",
        url: "https://google.com",
      });
      cy.createBlog({
        title: "test2",
        author: "TestAuthor2",
        url: "https://google.com",
      });
      cy.createBlog({
        title: "test3",
        author: "TestAuthor3",
        url: "https://google.com",
      });
    });

    it("A blog can be liked", function () {
      cy.get(
        "[data-testid=\"blog-card-test\"] > .pt-0 > .justify-between > [data-testid=\"show-details-btn\"]"
      ).click();
      cy.get("#likes-count").first().should("contain", "0");
      cy.get("#like-btn").click();
      cy.get("#likes-count").first().should("contain", "1");
    });

    it("Blogs are ordered by likes", function () {
      const blogPostsBefore = {
        1: { likes: 0, id: null },
        2: { likes: 0, id: null },
        3: { likes: 0, id: null },
      };

      const blogPostsAfter = {
        1: { likes: 0, id: null },
        2: { likes: 0, id: null },
        3: { likes: 0, id: null },
      };

      // Get #blog-list
      cy.get("#blog-list").should("exist");
      cy.getBlogLikesAndTitle(1, blogPostsBefore);
      cy.getBlogLikesAndTitle(2, blogPostsBefore);
      cy.getBlogLikesAndTitle(3, blogPostsBefore);

      cy.get(
        "[data-testid=\"blog-card-should-be-most-liked\"] > .pt-0 > .justify-between > .gap-x-4 > [data-testid=\"like-btn\"]"
      )
        .click()
        .click()
        .click();

      cy.getBlogLikesAndTitle(1, blogPostsAfter);
      cy.getBlogLikesAndTitle(2, blogPostsAfter);
      cy.getBlogLikesAndTitle(3, blogPostsAfter);

      cy.wrap(blogPostsBefore).should("not.deep.equal", blogPostsAfter);
      cy.get("#blog-list > :nth-child(1)").should(
        "contain",
        "should-be-most-liked"
      );
    });
  });
  describe("When logged in as another user", function () {
    beforeEach(function () {
      cy.visit("http://localhost:5173");
      cy.userLogin({ username: "test", password: "test" });
      cy.createBlog({
        title: "user blog",
        author: "created by user test",
        url: "https://google.com",
      });
      cy.get("#logout-btn").click();

      cy.userLogin({ username: "test2", password: "test2" });

    });
    it("An existing blog cannot be deleted if logged in user hasn't created it", function () {
      cy.get("#show-details-btn").click();
      cy.get("#delete-btn").should("not.exist");
    });
  });
});
