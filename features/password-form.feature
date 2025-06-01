
Feature: Password Form
  As a user
  I want to authenticate with a password
  So that I can access the protected content

  Scenario: Login with invalid password
    Given I am on the login page
    When I enter an invalid password
    And I click the submit button
    Then I should see an error message "Ungültiges Passwort"

  Scenario: Login with rate limit exceeded
    Given I am on the login page with error query parameter "rate_limit_exceeded"
    Then I should see an error message "Zu viele Versuche. Bitte versuchen Sie es später erneut."

  Scenario: Login with unknown error
    Given I am on the login page with error query parameter "unknown_error"
    Then I should see an error message "Ein unbekannter Fehler ist aufgetreten"
