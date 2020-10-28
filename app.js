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
      let traitSearch = [];
      searchResults = searchByTraits(people, traitSearch);
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
    var family = [];
    findFamily(person, people, family);
    displayRelatedPeople(family);
    break;
    case "descendants":
    var descendants = [];
    findDescendents(person, people, descendants);
    displayPeople(descendants);
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

// alerts a list of people with their relation
function displayRelatedPeople(people){
  if(people.length != 0){
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName+ " - " + person.relation;
    }).join("\n"));
  }
  else{
    alert("This person has no immediate family"); 
  }
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
function chars(input, response){
  //if something not equal to null
  return true; // default validation only
  // else : app(people)
}
function traitsValidate(input){
  return input.toLowerCase() == "dob" || input.toLowerCase() == "eye color" || input.toLowerCase() == "height" || input.toLowerCase() == "gender" || input.toLowerCase() == "weight" || input.toLowerCase() == "occupation";
}

function searchByGender(people, filtered){
  let gender = promptFor("What is the person's gender?", chars);

  let foundPerson = people.filter(function(person){
    if(person.gender == gender){
      return true;
    }
    else{
      return false;
    }
  })
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
  }
  return filtered;
}

function searchBydob(people, filtered){
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
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
  }
  return filtered;
}

function searchByHeight(people, filtered){
  let height = promptFor("What is the person's height, in inches?", chars);

  let foundPerson = people.filter(function(person){
    if(person.height == height){
      return true;
    }
    else{
      return false;
    }
  })
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
  }
  return filtered;
}

function searchByWeight(people, filtered){
  let weight = promptFor("What is the person's weight, in pounds?", chars);

  let foundPerson = people.filter(function(person){
    if(person.weight == weight){
      return true;
    }
    else{
      return false;
    }
  })
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
  }
  return filtered;
}

function searchByEyeColor(people, filtered){
  let color = promptFor("What is the person's eye color?", chars);

  let foundPerson = people.filter(function(person){
    if(person.eyeColor === color){
      return true;
    }
    else{
      return false;
    }
  })
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
  }
  return filtered;
}

function searchByOccupation(people, filtered){
  let occupation = promptFor("What is the person's occupation?", chars);

  let foundPerson = people.filter(function(person){
    if(person.occupation === occupation){
      return true;
    }
    else{
      return false;
    }
  })
  for (var i = 0; i < foundPerson.length; i++){
    filtered.push(foundPerson[i]);
    
  }
  return filtered;
}

function searchByTraits(people, traitSearch){
  let searchType = promptFor("What trait would you like to search by. Type 'gender', 'dob', 'height', 'weight', 'eye color', or 'occupation'", traitsValidate).toLowerCase();
  switch(searchType){
    case 'gender':
      searchByGender(people, traitSearch);
      continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'dob':
      searchBydob(people, traitSearch);
      continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'height':
     searchByHeight(people, traitSearch);
     continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'weight':
      searchByWeight(people, traitSearch);
      continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'eye color':
      searchByEyeColor(people, traitSearch);
      continueToSearch(traitSearch);
      return traitSearch;
      break;
    case 'occupation':
     searchByOccupation(people, traitSearch);
     continueToSearch(traitSearch);
      return traitSearch;
      break;
      
    default:
    app(people);
      break;
  }
}
function continueToSearch(value){
    if(value.length == 1){
      return value;
    }
    else if(value.length == 0 || value.length == null){
      return; 
    }
    else{
      let response = promptFor("Search another trait? Type Yes or No.", yesNo).toLowerCase();
      if(response == "yes"){
        searchByTraits(value, value);
        //return value;
        return;
      }
      else{
        //return value;
        return;
      }
    }
}

function checkResult(itemToCheck, people){
  if (itemToCheck == undefined){
    alert("Could not find that individual.");
    return app(people);
  }
   else if (itemToCheck.length == 1){
    mainMenu(itemToCheck, people);
  }
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

function findFamily(person, people, family){
findSiblings(person, people, family);
findParents(person, people, family);
findSpouse(person, people, family);
return family;
}

function findSpouse(person, people, family){
  let spouse;
   spouse = people.filter(function(other){
    if(person.currentSpouse != null){
      if(person.currentSpouse == other.id){
        return true;
      }
      else{
        return false;
      }
    }
  })      
  if(spouse != null){
    for(var i = 0; i < spouse.length; i++){
      spouse[i].relation = "Spouse";
      family.push(spouse[i]);
    }
  }
  return family;
}


function findParents(person, people, family){
  let parents = [];
  parents = people.filter(function(other){
    if(person.parents !== null){
      if(person.parents.includes(other.id)){
        return true;
      }
      else{
        return false;
      }
    }
  })      
  if(parents != null){
    for(var i = 0; i < parents.length; i++){
      parents[i].relation = "Parent";
      family.push(parents[i]);
    }
  }
  return family;
}

function findSiblings(person, people, family){
  let siblings;
  if(person.parents != null){
    for(var i = 0; i < person.parents.length; i++ ){
      siblings = people.filter(function(other){
        if(other.parents.includes(person.parents[i]) && other.id !== person.id){
          return true;
        }
        else{
          return false;
        }
      })
    }
  }
  if(siblings != null){
    for(var i = 0; i < siblings.length; i++){
      siblings[i].relation = "Sibling";
      family.push(siblings[i]);
    }
  }
  return family;
}