const app = {};

//ANIMATION METHODS
app.hideDiv = function(divName){
    $(`${divName}`).addClass('hide');
}

app.slideInItem = function(divName){
    $(`${divName}`).removeClass('hide');
    $(`${divName}`).addClass('animate-slideIn');
}

app.fadeOutItem = function(divName){
    $(`${divName}`).addClass('animate-fadeOut'); 
    $(`${divName}`).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            $(this).addClass('hide');
        });
}

//METHODS TO FETCH QUIZ INPUT
//Get the value selected in question 1
app.getTime = function () {
    app.time = $('input[name=time]:checked').val();
    console.log(app.time);
    return app.time;
};

//Get the value selected in question 2
app.getProtein = function () {
    app.protein = $('input[name=protein]:checked').val();
    console.log(app.protein);
    return app.protein;
};

//EVENTS
app.events = function(){
    //Start the quiz on start button click
    $('.start').on('click touchstart', function(e) {
        e.preventDefault();
        app.hideDiv('.start');
        app.hideDiv('.landing__intro-blurb-wrapper');
        app.slideInItem('.question1');
    });
    //On click in Question 1, hide Question 1 and reveal Question 2 with animations
    $('input[name="time"]').on('change', function(e) {
        e.preventDefault();
        app.slideInItem('.question2');
        app.fadeOutItem('.question1');
        // $('.question1').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        //     function(e) {
        //         $(this).addClass('hide');
        //     });
    });
    //On click in Question 2, hide Question 2 and fetch user input from all questions
    $('input[name="protein"]').on('click', function(e){
        e.preventDefault();
        app.fadeOutItem('.question2');
        // $('.question2').addClass('animate-fadeOut');
        // $('.question2').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        //     function(e) {
        //         $(this).addClass('hide');
        //     });
        $('.answer-wrapper').removeClass('hide');
        app.slideInItem('.answer-wrapper');
        // $('.answer-wrapper').addClass('animate-slideIn');
     
        //Call methods to fetch user input and save user input in variables
        let time = app.getTime();
        let protein = app.getProtein();
        let recipesSortedByTime = app.sortRecipesByTimeChosen(app.recipes, time);
        let finalRecipe = app.sortRecipesByProteinChosen(protein, app.sortedRecipesByTime);
    });

    //RESET BUTTON
    $('.reset-btn').on('click', function(e){
        e.preventDefault();
        //Select all elements with class of .animate-slideIn and .animate-faceOut and remove classes
        $('.animate-slideIn').removeClass('animate-slideIn');
        $('.animate-fadeOut').removeClass('animate-fadeOut');
        //Hide the recommended recipe info (results) from the completed quiz
        app.hideDiv('.answer-wrapper');
        //Unhide the landing page contents and start button
        $('.landing__intro-blurb-wrapper').removeClass('hide');
        $('.start').removeClass('hide');
        //Unbind the answers to questions in the completed quiz
        $('.question1').unbind();
        $('.question2').unbind();
        //Clear form answers from previous quiz
        $('.quizForm')[0].reset();
    });
};    

//FILTER RECIPES - 2 Steps
//Filter Step 1 - Narrow options based on cooking time user has selected
app.sortRecipesByTimeChosen = function(recipesList, time){
    recipesSortedByTime = app.recipes
        .filter((recipe) => {
            return recipe.time === time;
        })
        .map((recipe) => {
            return recipe;
        });
    console.log(recipesSortedByTime);
};

finalRecipe = null;

//Filter Step 2 - Narrow options based on protein user has selected
app.sortRecipesByProteinChosen = function(protein, sortedRecipesByTime){
    finalRecipe = recipesSortedByTime 
        .filter((recipe) => {
            return recipe.protein === protein;
        })
        .map((recipe) => {
            return recipe;
        });
    console.log(finalRecipe)
    console.log(finalRecipe[0].link);
    $('#answer').text(`${finalRecipe[0].name}`);
    $('#answer-link').attr('href', `${finalRecipe[0].link}`);
    $('#recipe-preview').attr('src', `${finalRecipe[0].photo}`);
    $('#recipe-source').text(`${finalRecipe[0].source}`);
};

app.init = function () {
    app.events();
};

$(function() {
    app.init();
});

//RECIPE DATA
app.recipes = [
    {
        name: 'Slow Cooker Vegetarian Chili',
        photo: './assets/veggie-chilli.jpg',
        source: 'Gimme Some Oven',
        time: 'quickie',
        protein: 'beans',
        link:'https://www.gimmesomeoven.com/slow-cooker-vegetarian-chili-recipe/'
    },
    {
        name: 'Instant Pot Mexican Quinoa Bowl',
        photo: './assets/mexican-quinoa.jpg',
        source: 'Where You Get Your Protein',
        time: 'oneHour',
        protein: 'beans',
        link: 'https://www.whereyougetyourprotein.com/mexican-quinoa-bowl/'
    },
    {
        name: 'Cauliflower and Mushroom Pot Pie with Black Olive Crust',
        photo: './assets/cauliflower-pie.jpg',
        source: 'Veganomicon (shared on Cooking Books)',
        time: 'sunday',
        protein: 'beans',
        link: 'http://cooking-books.blogspot.com/2008/11/cauliflower-and-mushroom-potpie-with.html'
    },
    {
        name: 'Meal Prep Shrimp Taco Bowls',
        photo: './assets/shrimp-taco-bowls.jpg',
        source: 'Gimme Delicious',
        time: 'thirtyMins',
        protein: 'shrimp',
        link: 'https://gimmedelicious.com/2017/02/27/shrimp-taco-meal-prep-bowls/'
    }, 
    {
        name: 'Sheet Pan Curry Shrimp Meal Prep Bowls',
        photo: './assets/sweet-cs-curry-shrimp.jpg',
        source: "Sweet C's",
        time: 'oneHour',
        protein: 'shrimp',
        link: 'https://sweetcsdesigns.com/sheet-pan-curry-shrimp-meal-prep-bowls/'
    }, 
    {
        name: 'Shrimp Fried Rice',
        photo: './assets/shrimp-fried-rice.jpg',
        source: 'Damn Delicious',
        time: 'sunday',
        protein: 'shrimp',
        link: 'https://damndelicious.net/2017/03/10/shrimp-fried-rice-meal-prep/'
    },
    {
        name: 'Honey-Sriracha Glazed Meatballs',
        photo: './assets/sriracha-meatballs.jpg',
        source: 'Eat Yourself Skinny',
        time: 'quickie',
        protein: 'bird',
        link:'http://www.eatyourselfskinny.com/honey-sriracha-glazed-meatballs/'
    }, 
    {
        name: 'Meal Prep Chicken Burrito Bowls',
        photo: './assets/chicken-burrito-bowls.jpg',
        source: 'Gimme Delicious',
        time: 'oneHour',
        protein: 'bird',
        link: 'https://gimmedelicious.com/2017/01/07/meal-prep-chicken-burrito-bowls/'
    }, 
    {
        name: 'Crockpot Creamy Cashew Chicken',
        photo: './assets/cashew-chicken.jpg',
        source: 'Halfbaked Harvest',
        time: 'sunday',
        protein: 'bird',
        link: 'https://www.halfbakedharvest.com/crockpot-creamy-cashew-chicken/'
    },
    {
        name: 'One Pot Spaghetti Squash and Meat Sauce',
        photo: './assets/one-pot-spaghetti-squash.jpg',
        source: 'Skinnytaste',
        time: 'quickie',
        protein: 'redMeat',
        link: 'https://www.skinnytaste.com/one-pot-spaghetti-squash-and-meat-sauce-pressure-cooker-and-slow-cooker/'
    }, 
    {
        name: 'Meal Prep Carnitas Burrito Bowls',
        photo: './assets/meal-prep-carnitas-bowl1.jpg',
        source: 'Fit Foodie Finds',
        time: 'oneHour',
        protein: 'redMeat',
        link: 'https://fitfoodiefinds.com/meal-prep-carnitas-burrito-bowls/'
    }, 
    {
        name: 'Slow Cooker Pot Roast',
        photo: './assets/beef-pot-roast.jpg',
        source: 'Recipe Tin Eats',
        time: 'sunday',
        protein: 'redMeat',
        link: 'https://www.recipetineats.com/slow-cooker-beef-pot-roast'
    }
];
