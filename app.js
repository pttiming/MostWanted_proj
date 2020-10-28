"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      mainMenu(searchResults, people)
      break;
    case 'no':
      searchResults = searchByTraits(people);
      checkResult(searchResults, people);
      //searchResults = continueSearch(searchResults);
      //Ask if would like to search for more using switchcase
      break;
      default:
    app(people); // restart app
      break;
  }
  
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  person = person[0];
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person)
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
      var family = [];
      let descendants = findDescendents(person, people, family);
      displayPeople(family);
      mainMenu(person, people);
    break;
    case "restart":
    app(people); 
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people); 
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Date of Birth:" + person.dob + "\n";
  personInfo += "Height:" + person.height + "\n";
  personInfo += "Weight:"+ person.weight + "\n";
  personInfo += "Eye Color:"+ person.eyeColor + "\n";
  personInfo += "Occupation:"+ person.occupation + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
function searchByGender(people){
  let gender = promptFor("Is the person you are searching for male or female? Write Male or Female.", chars);
  let foundPeople = people.filter(function(person){
    if(person.gender === gender){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPeople;
}
function searchBydob(people){
  let month = promptFor("What is the person's birth month? Answer numerically.", chars);
  let day = promptFor("What is the person's birth day?", chars);
  let year = promptFor("What is the person's birth year? Answer in four digits.", chars)

  let foundPerson = people.filter(function(person){
    if(person.dob === month +"/"+ day+"/" + year || person.dob === month +"/0"+ day+"/" + year ){
      return true;
    }
    else{
      return false;
    }
  })
 
  return foundPerson;
}

function searchByHeight(people){
  let height = promptFor("What is the person's height, in inches?", chars);

  let foundPerson = people.filter(function(person){
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByWeight(people){
  let weight = promptFor("What is the person's weight, in pounds?", chars);

  let foundPerson = people.filter(function(person){
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByEyeColor(people){
  let color = promptFor("What is the person's eye color?", chars);

  let foundPerson = people.filter(function(person){
    if(person.eyeColor === color){
      return true;
    }
    else{
      return false;
    }
  })
 
  return foundPerson;
}

function searchByOccupation(people){
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function searchByTraits(people){
  let traitSearch;
  let searchType = promptFor("What trait would you like to search by. Type 'gender', 'dob', 'height', 'weight', 'eye color', or 'occupation'", chars).toLowerCase();
  switch(searchType){
    case 'gender':
      traitSearch = searchByGender(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'dob':
      traitSearch = searchBydob(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'height':
      traitSearch = searchByHeight(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'weight':
      traitSearch = searchByWeight(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'eye color':
      traitSearch = searchByEyeColor(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'occupation':
      traitSearch = searchByOccupation(people);
      traitSearch = continueToSearch(traitSearch);
      return traitSearch;
      break;
      
    default:
    app(people);
      break;
  }
}
function continueSearch(people){
  let searchType = promptFor("Would you like to search by more criteria? Enter 'yes' or 'no'", yesNo).toLowerCase();
  //let searchResults;
  let searchArray;
  switch(searchType){
    case 'yes':
      searchResults = searchByTraits(people);
      continueSearch(searchResults)
      break;
    case 'no':
      //return to them to the main app method.
      return people;
    default: 
      continueSearch(people);
      break;
  }
}
function continueToSearch(value){
    if(value.length == 1){
      return value;
    }
    else if(value.length == 0 || value.length == null){
      return; // restart
    }
    else{
      let response = promptFor("Search another trait? Type Yes or No.", yesNo).toLowerCase();
      if(response == "no"){
        return value;
      }
      else if (response == "yes"){
        searchByTraits(value);
        return value;
      }
      else{
        return value;
      }
    }
}

function checkResult(itemToCheck, people){
  if (itemToCheck.length == 1){
    mainMenu(itemToCheck, people);
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  else if (itemToCheck.length > 1){
    displayPeople(itemToCheck);
    return app(people);
  }
}

function findDescendents(person, people, family){
  let searchPersonId = person.id;
  let descendants = people.filter(function(person){
      if(person.parents.includes(searchPersonId)){
        return true;
      }
      else{
        return false;
      }
  })
  for(var i = 0; i < descendants.length; i++){
    family.push(descendants[i]);
  }
  if(descendants !== null){
    for(var i = 0; i < descendants.length; i++){
      findDescendents(descendants[i], people, family)
    }
  }
  else{
    return family;
  }
}
      

    
  
  
