describe("Note ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user = {
      name: "test",
      username: "test",
      password: "test",
    };

    const user2 = {
      name: "test2",
      username: "test2",
      password: "test2",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.request("POST", "http://localhost:3003/api/users/", user2);

    cy.visit("http://localhost:5173");
    cy.contains("login").click();
  });

  it("front page can be opened and contains 'blogs'", function () {
    cy.contains("blogs");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("test logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("Wrong credentials, please try again");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("Test Title");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("https://google.com");
      cy.get("#submit-blog-btn").click();
    });

    it("A blog can be created", function () {
      cy.contains("a new blog Test Title by Test Author added");
      cy.contains("Test Title Test Author");
    });

    it("A blog can be liked", function () {
      cy.get("#show-details-btn").click();
      cy.contains("Likes: 0");
      cy.get("#like-btn").click();
      cy.contains("Likes: 1");
    });

    it("A blog can be deleted", function () {
      cy.get("#show-details-btn").click();
      cy.get("#delete-btn").click();
      cy.get("html").should("not.contain", "Test Title Test Author");
    });

    it("Blogs are ordered by likes", function () {
      cy.get("#title").type("Should be most liked");
      cy.get("#author").type("More Likes");
      cy.get("#url").type("https://google.com");

      cy.get("#submit-blog-btn").click();

      cy.wait(1000);

      cy.get(".blog-item")
        .should("exist")
        .last()
        .within(() => {
          cy.get(".show-details-btn").should("exist").click();
          cy.get(".like-btn").should("exist").click();
          cy.get(".show-details-btn").should("exist").click();
        });

      // Verifying the ordering based on likes
      cy.get(".blog-item")
        .eq(0)
        .should("contain", "Should be most liked More Likes");
      cy.get(".blog-item").eq(1).should("contain", "Test Title Test Author");
    });
  });

  describe("When logged in as another user", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
      cy.contains("new blog").click();
      cy.get("#title").type("Test Title");
      cy.get("#author").type("Test Author");
      cy.get("#url").type("https://google.com");
      cy.get("#submit-blog-btn").click();
      cy.get("#logout-btn").click();
      cy.contains("login").click();
      cy.get("#username").type("test2");
      cy.get("#password").type("test2");
      cy.get("#login-button").click();
    });
    it("An existing blog cannot be deleted if logged in user hasn't created it", function () {
      cy.get("#show-details-btn").click();
      cy.get("#delete-btn").should("not.exist");
    });
  });
});
