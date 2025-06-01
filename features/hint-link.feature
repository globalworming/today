
Feature: Hint Link
  As a user
  I want to access help when I have problems
  So that I can get assistance with login issues

  Scenario: Open chat section via hint link
    Given I am on the login page
    When I click the "Probleme?" hint link
    Then the chat section should open below the form
    And I should see an agent message "Wie kann ich helfen?"
    And a user message "Ich habe Probleme" should be automatically sent
