

let homeLetters = ["a", "g", "r", "b", "c", "f", "d"];
let homePAGE = document.querySelector(".homePAGE");
///////////////////////////////////////////home page function////////////////////////////////////////
let home = async function (letter) {
  let hero = {
    meal_name1: "",
    meal_image1: "",
    meal_disc1: "",
    meal_name2: "",
    meal_image2: "",
    meal_disc2: "",
    meal_name3: "",
    meal_image3: "",
    meal_disc3: "",
  };
  let mealData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let mealInfo = await mealData.json();

  hero.meal_name1 = await mealInfo.meals[0].strMeal;
  hero.meal_name2 = await mealInfo.meals[1].strMeal;
  hero.meal_name3 = await mealInfo.meals[2].strMeal;

  hero.meal_id1 = await mealInfo.meals[0].idMeal;
  hero.meal_id2 = await mealInfo.meals[1].idMeal;
  hero.meal_id3 = await mealInfo.meals[2].idMeal;

  hero.meal_image1 = await mealInfo.meals[0].strMealThumb;

  hero.meal_image2 = await mealInfo.meals[1].strMealThumb;

  hero.meal_image3 = await mealInfo.meals[2].strMealThumb;

  hero.meal_disc1 = await mealInfo.meals[0].strInstructions
    .split(" ")
    .splice(0, 8)
    .join(" ");
  hero.meal_disc2 = await mealInfo.meals[1].strInstructions
    .split(" ")
    .splice(0, 8)
    .join(" ");
  hero.meal_disc3 = await mealInfo.meals[2].strInstructions
    .split(" ")
    .splice(0, 8)
    .join(" ");

  return hero;
};
////////////////////////////////////////////////////////////////display the home page function///////////////////////////////////////////
let dis = async function (letters) {
  $(homePAGE).css("display", "grid");
  let arr = [];
  arr[0] = await home("p");
  let box = "";
  for (let i = 1; i <= 6; i++) {
    arr[i] = await home(letters[i]);
  }

  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    box += `    
      <div class=" p-4">
          <div class="card carbg" style="width: 18rem;" onclick="display_meal('${arr[i].meal_id1}');">
              <img src="${arr[i].meal_image1}" class="card-img-top" alt="...">
              <div class="card-body">
                <h6 class="card-title">${arr[i].meal_name1}</h6>
                <p class="card-text">${arr[i].meal_disc1} <span  display_meal('${arr[i].meal_id1}');><p> see more</p> </span></p>
               
              </div>
            </div>
      </div>

      <div class=" p-4">
      <div class="card carbg" style="width: 18rem;" onclick="display_meal('${arr[i].meal_id2}');">
          <img src="${arr[i].meal_image2}" class="card-img-top" alt="...">
          <div class="card-body">
            <h6 class="card-title">${arr[i].meal_name2}</h6>
            <p class="card-text">${arr[i].meal_disc2} <span  display_meal('${arr[i].meal_id2}');><p> see more</p> </span></p>
           
          </div>
        </div>
  </div>


  <div class=" p-4">
  <div class="card carbg" style="width: 18rem;" onclick="display_meal('${arr[i].meal_id3}');">
      <img src="${arr[i].meal_image3}" class="card-img-top" alt="...">
      <div class="card-body">
        <h6 class="card-title">${arr[i].meal_name3}</h6>
        <p class="card-text">${arr[i].meal_disc3} <span  display_meal('${arr[i].meal_id3}');><p> see more</p> </span></p>
       
      </div>
    </div>
</div>

  
`;
  }
  homePAGE.innerHTML = box;
  document.querySelector(".forSearch").innerHTML = "";
};
dis(homeLetters);

$(".hom").click(function () {
  dis(homeLetters);
});

/////////////////////////////////////////////////////////////sidebar////////////////////////////////////
$(".slidicon").click(function () {
  let boxwidth = $(".box").outerWidth();
  if ($(".slidebar").css("left") !== `0px`) {
    $(".slidebar").animate({ left: 0 }, 800);
  }
  if ($(".slidebar").css("left") === `0px`)
    $(".slidebar").animate({ left: `-${boxwidth}` }, 800);
});

$(".singerbundle").click(function () {
  let x = $(this).next();
  if (x.css("display") === "block") x.slideUp();
  else x.slideDown();
});
///////////////////////////////////////////////////show catgories function////////////////////////////////////////////////////
let cat = async function () {
  let catArr = [];

  let catgories = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let mealCargories = await catgories.json();

  for (let i = 0; i < mealCargories.categories.length; i++) {
    catArr[i] = await mealCargories.categories[i];
  }
  return catArr;
};
///////////////////////////////////////////////////////////click on catgories function/////////////////////////////////////////////////////////////////
$(".det").click(async function () {
  let arr = await cat();

  $(homePAGE).css("display", "grid");
  let box = "";
  for (let i = 0; i < 12; i++) {
    box += `   
 
 <div class=" p-4" >
 <div class="card carbg" style="width: 18rem;"  onclick="display_all('${
   arr[i].strCategory
 }','c');"  >
     <img src="${arr[i].strCategoryThumb}" class="card-img-top" alt="...">
     <div class="card-body">
       <h6 class="card-title">${arr[i].strCategory}</h6>
       <p class="card-text">${arr[i].strCategoryDescription
         .split(" ")
         .slice(0, 15)
         .join(" ")} <span onclick="display_all('${
      arr[i].strIngredient
    }','c');"><p>see more </p></span></p>
      
     </div>
   </div>
</div>

`;
  }
  document.querySelector(".forSearch").innerHTML = "";
  homePAGE.innerHTML = box;
});
//////////////////////////////////////////////////////////////listing areas//////////////////////////////////////////////////////////////////////
let area = async function () {
  let areaArr = [];

  let areas = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let mealArea = await areas.json();

  for (let i = 0; i < mealArea.meals.length; i++) {
    areaArr[i] = await mealArea.meals[i];
  }
  console.log(areaArr);
  return areaArr;
};

$(".dur").click(async function () {
  let arr = await area();
  $(homePAGE).css("display", "grid");
  let box = "";
  for (let i = 0; i < 24; i++) {
    box += `   
 
 <div class=" p-4"onclick="display_all('${arr[i].strArea}','a');">
 <div class="card carbg" style="width: 18rem;">
 <img src="pics/Earth_flag_proposal_6.png" alt="">
     <div class="card-body">
       <h4 class="card-title">${arr[i].strArea}</h4>
  
      
     </div>
   </div>
</div>


`;
    homePAGE.innerHTML = box;
    document.querySelector(".forSearch").innerHTML = "";
  }
});
//////////////////////////////////////////////////////list by ingrediants///////////////////////////////////////////////////////////

let ing = async function () {
  let ingArr = [];

  let ing = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let mealing = await ing.json();

  for (let i = 0; i < 24; i++) {
    ingArr[i] = await mealing.meals[i];
  }
  console.log(ingArr);
  return ingArr;
};

$(".ing").click(async function () {
  let arr = await ing();
  $(homePAGE).css("display", "grid");
  let box = "";
  for (let i = 0; i < 21; i++) {
    box += `   
 
 <div class=" p-4 " onclick="display_all('${arr[i].strIngredient}','i');">
 <div class="card carbg" style="width: 18rem;">
 <img src="pics/Different-types-of-spices-of-the-table-apr18.jpg" alt="">
     <div class="card-body">
       <h4 class="card-title">${arr[i].strIngredient}</h4>
  
       <p class="card-text">${arr[i].strDescription
         .split(" ")
         .slice(0, 15)
         .join(" ")} <span onclick="display_all('${
      arr[i].strIngredient
    }','i');"><p>see more </p></span></p>
     </div>
   </div>



</div>
`;
  }
  homePAGE.innerHTML = box;
  document.querySelector(".forSearch").innerHTML = "";
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

let ingelement = async function (ingrediant, key) {
  let ingArr = [];
  ingrediant.replace(" ", "_");
  let ing = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${key}=${ingrediant}`
  );
  let mealing = await ing.json();

  for (let i = 0; i < mealing.meals.length; i++) {
    ingArr[i] = await mealing.meals[i];
  }
  console.log(ingArr);
  return ingArr;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let display_all = async function (ingrediant, key) {
  let arr = await ingelement(ingrediant, key);
  let box = "";
  $(homePAGE).css("display", "grid");
  for (let i = 0; i < arr.length; i++) {
    box += `   

<div class=" p-4 ingrediantElement" onclick="display_meal('${arr[i].idMeal}');">
<div class="card carbg" style="width: 18rem;">
<img src="${arr[i].strMealThumb}" alt="">
   <div class="card-body">
     <h4 class="card-title">${arr[i].strMeal}</h4>

    
   </div>
 </div>



</div>
`;
  }
  $(homePAGE).css("display", "grid");
  homePAGE.innerHTML = box;
  document.querySelector(".forSearch").innerHTML = "";
  console.log(arr);
};

let Themeal = async function (id) {
  let mainMeal;
  let mealFetch = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let mealjs = await mealFetch.json();

  mainMeal = await mealjs.meals[0];

  console.log(mainMeal);
  return mainMeal;
};

Themeal();

//////////////
let display_meal = async function (id) {
  $(homePAGE).css("display", "block");

  let mainMeal = await Themeal(id);
  console.log(mainMeal);
  document.querySelector(".recpies");
  let box = `

<div class="mainMealDiv row">
  <div class="text-center  mealpic col-md-6">
  <img src="${mainMeal.strMealThumb}"  alt="">  

  <h2>${mainMeal.strMeal}</h2>  
</div>
<div class="mealinfo col-md-6">
  <h2>instructions</h2>
  <p>${mainMeal.strInstructions}</p>
  <h2>area :<span>${mainMeal.strArea}</span></h2>
  <h2>category :<span>${mainMeal.strCategory}</span></h2>

  <div >
    <h2>recipes</h2>
    <ul class=" recpies list-unstyled"></ul>
  </div>
  <div class="">
    <h2>tags</h2>
    <ul class="tags text-center list-unstyled"></ul>
  </div>
  <div>
    <a type="submit" target="_blank" class="add btn btn-outline-primary btn-sm  mt-4 " href="${mainMeal.strSource}">Source🧑‍🍳</a></div>
    <a type="submit" target="_blank" class="add btn btn-outline-danger btn-sm  mt-4 " href="${mainMeal.strYoutube}">Youtube</a></div>
  </div>


  `;
  let box2 = "";

  let j = 1;
  while (j <= 20) {
    if (mainMeal[`strIngredient${j}`]) {
      box2 += `<li class="my-3  p-1 bg-warning rounded">${
        mainMeal[`strMeasure${j}`]
      } ${mainMeal[`strIngredient${j}`]}</li>`;
    }

    j++;
  }

  let tagsArr = mainMeal.strTags?.split(",");

  let tagsbox = "";

  for (let i = 0; i < tagsArr?.length; i++) {
    tagsbox += `<li class="  bg-danger rounded">${tagsArr[i]}</li>`;
  }

  homePAGE.innerHTML = box;
  console.log(box2);
  document.querySelector(".recpies").innerHTML = box2;
  document.querySelector(".tags").innerHTML = tagsbox;
  document.querySelector(".forSearch").innerHTML = "";
};
/////////////////////////////////////////////////////search////////////////////////////////////////////////////////////////
$(".ser").click(function () {
  $(homePAGE).css("display", "block");

  let overview = `
  <div class="search d-flex">
  <input type="text" class="in1 form-control m-1" maxlength="1"  oninput="displaySearch(this.value)"  placeholder="search by first letter">
      

        
<input type="text" class="in2 form-control m-1 "oninput="displaySearchword(this.value)" placeholder="search by word">


  </div>
  `;

  homePAGE.innerHTML = overview;
});

let searchfirst = async function (letter) {
  let foodArr = [];

  let food = await fetch(
    `
    https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );
  let foodjs = await food.json();

  for (let i = 0; i < foodjs.meals.length; i++) {
    foodArr[i] = await foodjs.meals[i];
  }
  console.log(foodArr);
  return foodArr;
};

let displaySearch = async function (letter) {
  let arr = await searchfirst(letter);
  let box = "";
  console.log(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    box += `   

<div class=" p-4 ingrediantElement" onclick="display_meal('${arr[i].idMeal}');">
<div class="card carbg" style="width: 18rem;">
<img src="${arr[i].strMealThumb}" alt="">
   <div class="card-body">
     <h4 class="card-title">${arr[i].strMeal}</h4>

    
   </div>
 </div>



</div>
`;
  }

  document.querySelector(".forSearch").innerHTML = box;
};

/////////////////////////////////////////////////////////////////////search by word////////////////////////////////////////////////////
let searchword = async function (word) {
  let foodArr = [];

  let food = await fetch(
    `
    https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );
  let foodjs = await food.json();

  for (let i = 0; i < foodjs.meals.length; i++) {
    foodArr[i] = await foodjs.meals[i];
  }
  console.log(foodArr);
  return foodArr;
};

let displaySearchword = async function (word) {
  let arr = await searchword(word);
  let box = "";
  console.log(arr[0]);

  for (let i = 0; i < arr.length; i++) {
    box += `   

<div class=" p-4 ingrediantElement" onclick="display_meal('${arr[i].idMeal}');">
<div class="card carbg" style="width: 18rem;">
<img src="${arr[i].strMealThumb}" alt="">
   <div class="card-body">
     <h4 class="card-title">${arr[i].strMeal}</h4>

    
   </div>
 </div>



</div>
`;
  }

  document.querySelector(".forSearch").innerHTML = box;
};

////////////////////////////////////////////////////////////////////////regex for check form//////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".cont").click(function () {
  $(homePAGE).css("display", "block");

  let forms = `
  <div class="forms d-flex ">
 
  


 <div class="inputgroup1 m-3">
  <input type="text" class="username form-control p-2"  oninput="checkusername(this.value)"  placeholder="username">
      
  <input type="text" class="email form-control  mt-4 " oninput="checkemail(this.value)" placeholder="email">
        
<input type="text" class="age form-control  mt-4 " oninput="checkage(this.value)" placeholder="age">


 </div>
 
 <div class="inputgroup1 m-3">
 <input type="text" class="pass form-control p-2"  oninput="checkpass(this.value);"  placeholder="password">
     <p class="pass">the password should be a mix of nums and letters</p>
 <input type="text" class="repass form-control mt-3" oninput="checkrepass(this.value)" placeholder="repassword">
       
<input type="text" class="phone form-control mt-3 " oninput="checkphone(this.value)"  placeholder="phone number">


</div>

 </div>
 <div class="form-control alertup bg-danger hidden ">
  <p class="site-na">there is something wrong with your inputs</p>

  </div>
 <button class="btn btn-outline-danger btn-sm  mt-4 " id="button">Save</button> `;

  homePAGE.innerHTML = forms;
  document.querySelector(".forSearch").innerHTML = "";
});

function isNameValid(username) {
  return /^[a-zA-Z ]+$/.test(username);
}

function isEmailValid(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isPhoneValid(userPhone) {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    userPhone
  );
}

function isAgeValid(age) {
  return /^[1-9][0-9]?$|^100$/.test(age);
}

function isPasswordValid(pass) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass);
}

function isRePasswordValid(pass, repass) {
  return pass == repass;
}

let username = document.querySelector(".username");
let email = document.querySelector(".email");
let age = document.querySelector(".age");
let pass = document.querySelector(".pass");
let repass = document.querySelector(".repass");
let phone = document.querySelector(".phone");

function checkpass(pass) {
  let button = document.querySelector("#button");
  let alertup = document.querySelector(".alertup");
  if (isPasswordValid(pass) != true) {
    button.disabled = true;
    alertup.classList.remove("hidden");
  }
  if (isPasswordValid(pass) == true) {
    alertup.classList.add("hidden");
    button.disabled = false;
  }
}

function checkusername(name) {
  let button = document.querySelector("#button");
  let alertup = document.querySelector(".alertup");
  if (isNameValid(name) != true) {
    button.disabled = true;
    alertup.classList.remove("hidden");
  }
  if (isNameValid(name) == true) {
    button.disabled = false;
    alertup.classList.add("hidden");
  }
}

function checkemail(email) {
  let button = document.querySelector("#button");
  let alertup = document.querySelector(".alertup");
  if (isEmailValid(email) != true) {
    alertup.classList.remove("hidden");
    button.disabled = true;
  }
  if (isEmailValid(email) == true) {
    alertup.classList.add("hidden");
    button.disabled = false;
  }
}

function checkage(age) {
  let button = document.querySelector("#button");
  let alertup = document.querySelector(".alertup");
  if (isAgeValid(age) != true) {
    button.disabled = true;
    alertup.classList.remove("hidden");
  }

  if (isAgeValid(age) == true) {
    button.disabled = false;
    alertup.classList.add("hidden");
  }
}

function checkrepass(repass) {
  let button = document.querySelector("#button");
  let alertup = document.querySelector(".alertup");
  let password = document.querySelector(".pass").value;
  if (isRePasswordValid(password, repass) != true) {
    alertup.classList.remove("hidden");
    button.disabled = true;
  }
  if (isRePasswordValid(password, repass) == true) {
    alertup.classList.add("hidden");
    button.disabled = false;
  }
}

function checkphone(phone) {
  let alertup = document.querySelector(".alertup");
  let button = document.querySelector("#button");
  if (isPhoneValid(phone) != true) {
    button.disabled = true;
    alertup.classList.remove("hidden");
  }
  if (isPhoneValid(phone) == true) {
    alertup.classList.add("hidden");
    button.disabled = false;
  }
}

$(".dark").click(function () {
  let card = document.querySelectorAll(".card");

  let dummy = document.querySelector(".dummy");

  if (dummy.classList.contains("bgblack")) {
    dummy.classList.remove("bgblack");
    for (let i = 0; i < card.length; i++) {
      card[i].classList.remove("carbg");
    }
  } else if (dummy.classList.contains("bgblack") != true) {
    dummy.classList.add("bgblack");
    for (let i = 0; i < card.length; i++) {
      card[i].classList.add("carbg");
    }
  }
});

$(document).ready(function(){

$('#loading .lds-ellipsis').fadeOut(1000,function(){

  $('#loading').fadeOut(600,function(){
      $('#loading').remove();
      $('body').css('overflow','auto');
  })
})
})


