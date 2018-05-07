const app = {};

app.events = function(){
    //Get form input 
    $('form').on('submit', function(e) {
    e.preventDefault();
    //Save user input in variables
    
    const time = app.getTime();
    const protein = app.getProtein();
    const recipesSortedByTime = app.sortRecipesByTimeChosen(app.recipes, time);
    const finalRecipe = app.sortRecipesByProteinChosen(protein, app.sortedRecipesByTime);
    });
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
    console.log(finalRecipe);
    $('.answer').text(`some ${finalRecipe[0].name}`);
};

app.init = function () {
    app.events();
};

$(function() {
    app.init();
    
});



//filter? narrow down to the ones that match the right protein selected in user input and make new array
//output an answer by adding a new alert as a pop-up, or completing a sentence like "you should eat _________"

//BONUS - randomly select a recipe from within the array/obj



app.recipes = [
    {
        name: 'rec1',
        title: 'FastBeans',
        time: 'quickie',
        protein: 'bean',
        description: 'Witty description of the meal in less than 30 words followed by a link: ',
        link: 'http://www.instagram.com/recipe123'
    },
    {
        name: 'rec2',
        time: 'oneHour',
        protein: 'bean',
        link: 'http://www.instagram.com/recipe123'
    },
    {
        name: 'rec3',
        time: 'sunday',
        protein: 'bean',
        link: 'http://www.instagram.com/recipe123'
    },
    {
        name: 'rec4',
        time: 'thirtyMins',
        protein: 'shrimp',
        link: 'http://www.instagram.com/recipe123'
    }, 
    {
        name: 'rec5',
        time: 'oneHour',
        protein: 'shrimp',
        link: 'http://www.instagram.com/recipe123'
    }, 
    {
        name: 'rec6',
        time: 'sunday',
        protein: 'shrimp',
        link: 'http://www.instagram.com/recipe123'
    },
    {
        name: 'Honey-Sriracha Glazed Meatballs',
        time: 'quickie',
        protein: 'bird',
        link:'http://www.eatyourselfskinny.com/honey-sriracha-glazed-meatballs/'
    }, 
    {
        name: 'rec8',
        time: 'oneHour',
        protein: 'bird',
        link: 'http://www.instagram.com/recipe123'
    }, 
    {
        name: 'rec9',
        time: 'sunday',
        protein: 'bird',
        link: 'http://www.instagram.com/recipe123'
    },
    {
        name: 'rec10',
        time: 'quickie',
        protein: 'redMeat',
        link: 'http://www.instagram.com/recipe123'
    }, 
    {
        name: 'rec11',
        time: 'oneHour',
        protein: 'redMeat',
        link: 'http://www.instagram.com/recipe123'
    }, 
    {
        name: 'rec12',
        time: 'sunday',
        protein: 'redMeat',
        link: 'http://www.instagram.com/recipe123'
    }
];
