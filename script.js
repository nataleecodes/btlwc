const app = {};

app.hideDiv = function(divName){
    $(`${divName}`).addClass('hide');
}

app.slideInItem = function(divName){
    $(`${divName}`).removeClass('hide');
    $(`${divName}`).addClass('animate-slideIn');
}

app.fadeOutItem = function(divName){
    $(`${divName}`).addClass('animate-fadeOut'); 
}

app.events = function(){
    $('.start').on('click touchstart', function(e) {
        e.preventDefault();
        console.log("Hide button");
        app.hideDiv('.start');
        app.hideDiv('.landing__intro-blurb-wrapper');
        app.slideInItem('.question1');
    });
    $('input[name="time"]').on('change', function(e) {
        e.preventDefault();
        app.slideInItem('.question2');
        app.fadeOutItem('.question1');
        $('.question1').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function (e) {
                $(this).addClass('hide');
                // code to execute after animation ends
            });
    });
    //Get form input 
    $('form').on('submit', function(e) {
        e.preventDefault();
        $('.question2').addClass('animate-fadeOut');
        $('.question2').one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
            function (e) {
                $(this).addClass('hide');
                // code to execute after animation ends
            });
        $('.answer-wrapper').removeClass('hide');
        $('.answer-wrapper').addClass('animate-slideIn');
        //Save user input in variables
        const time = app.getTime();
        const protein = app.getProtein();
        const recipesSortedByTime = app.sortRecipesByTimeChosen(app.recipes, time);
        const finalRecipe = app.sortRecipesByProteinChosen(protein, app.sortedRecipesByTime);
    });
    $('.reset').on('click', function() {
        $('.animate-slideIn').removeClass('animate-slideIn');
        $('.animate-fadeOut').removeClass('animate-fadeOut');
        $('.start').removeClass('hide');
        
    });
    //RESET BUTTON TODO:
    //1. On click:
    //A - remove hide from start button
    //B - add hide to results display
    //C - select all elements with class of .animate-slideIn and .animate-faceOut and remove classes
    //D - form clear 
    //E - fade in your landing screen stuff (new keyframes)

};    

app.getTime = function(){
    app.time = $('input[name=time]:checked').val();
    console.log(app.time);
    return app.time;
};

app.getProtein = function(){
    app.protein = $('input[name=protein]:checked').val();
    console.log(app.protein);
    return app.protein;
};

//Filter recipes by cooking time user has selected
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

//Filter recipes by protein user has selected
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
};

app.init = function () {
    app.events();
};

$(function() {
    app.init();
});


app.recipes = [
    {
        name: 'Slow Cooker Vegetarian Chili',
        time: 'quickie',
        protein: 'beans',
        link:'https://www.gimmesomeoven.com/slow-cooker-vegetarian-chili-recipe/'
    },
    {
        name: 'Instant Pot Mexican Quinoa Bowl',
        time: 'oneHour',
        protein: 'beans',
        link: 'https://www.whereyougetyourprotein.com/mexican-quinoa-bowl/'
    },
    {
        name: 'Cauliflower and Mushroom Pot Pie with Black Olive Crust',
        time: 'sunday',
        protein: 'beans',
        link: 'http://www.geniuskitchen.com/recipe/cauliflower-and-mushroom-pot-pie-with-black-olive-crust-316577'
    },
    {
        name: 'Meal Prep Shrimp Taco Bowls',
        time: 'thirtyMins',
        protein: 'shrimp',
        link: 'https://gimmedelicious.com/2017/02/27/shrimp-taco-meal-prep-bowls/'
    }, 
    {
        name: 'Sheet Pan Curry Shrimp Meal Prep Bowls',
        time: 'oneHour',
        protein: 'shrimp',
        link: 'https://sweetcsdesigns.com/sheet-pan-curry-shrimp-meal-prep-bowls/'
    }, 
    {
        name: 'Shrimp Fried Rice',
        time: 'sunday',
        protein: 'shrimp',
        link: 'https://damndelicious.net/2017/03/10/shrimp-fried-rice-meal-prep/'
    },
    {
        name: 'Honey-Sriracha Glazed Meatballs',
        time: 'quickie',
        protein: 'bird',
        link:'http://www.eatyourselfskinny.com/honey-sriracha-glazed-meatballs/'
    }, 
    {
        name: 'Meal Prep Chicken Burrito Bowls',
        time: 'oneHour',
        protein: 'bird',
        link: 'https://gimmedelicious.com/2017/01/07/meal-prep-chicken-burrito-bowls/'
    }, 
    {
        name: 'Crockpot Creamy Cashew Chicken',
        time: 'sunday',
        protein: 'bird',
        link: 'https://www.halfbakedharvest.com/crockpot-creamy-cashew-chicken/'
    },
    {
        name: 'One Pot Spaghetti Squash and Meat Sauce',
        time: 'quickie',
        protein: 'redMeat',
        link: 'https://www.skinnytaste.com/one-pot-spaghetti-squash-and-meat-sauce-pressure-cooker-and-slow-cooker/'
    }, 
    {
        name: 'Meal Prep Carnitas Burrito Bowls',
        time: 'oneHour',
        protein: 'redMeat',
        link: 'https://www.yummly.com/recipe/Meal-Prep-Carnitas-Burrito-Bowls-2222415?prm-v1'
    }, 
    {
        name: 'Slow Cooker Pot Roast',
        time: 'sunday',
        protein: 'redMeat',
        link: 'https://www.recipetineats.com/slow-cooker-beef-pot-roast'
    }
];
