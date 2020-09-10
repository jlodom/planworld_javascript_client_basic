'use strict';
/* Changes to be made when deploying to Production. */
var baseUrl = 'https://pcola.planwatch.world/client';
var boolNeedLogin = true;
var token = '0';

window.onload = async () => {
	/* Create (New) Login Screen */
	var divLogin = document.createElement('div');
	divLogin.id = 'loginscreen';
	divLogin.className = 'classLoginOverlay';
	var labelUsername = document.createElement('label');
	labelUsername.innerText = 'Username';
	var inputUsername = document.createElement('input');
	inputUsername.setAttribute('type', 'text');
	inputUsername.id = 'inputusername';
	var labelPassword = document.createElement('label');
	labelPassword.innerText = 'Password';
	var labelPassword = document.createElement('label');
	labelPassword.innerText = 'Password';
	var inputPassword = document.createElement('input');
	inputPassword.setAttribute('type', 'password');
	inputPassword.id = 'inputpassword';
	var buttonLogin = document.createElement('button');
	buttonLogin.id = 'buttonlogin';
	buttonLogin.innerText = 'Login';
	buttonLogin.addEventListener('click', async function () {
		var passUsername = document.getElementById('inputusername').value;
		var passPassword = document.getElementById('inputpassword').value;
		token = await PW_Debug_Login(baseUrl, passUsername, passPassword);
		if (token > 0) {
			HideLoginScreen();
			RefreshInterface();
		}
	});
	divLogin.appendChild(labelUsername);
	divLogin.appendChild(document.createElement('br'));
	divLogin.appendChild(inputUsername);
	divLogin.appendChild(document.createElement('br'));
	divLogin.appendChild(labelPassword);
	divLogin.appendChild(document.createElement('br'));
	divLogin.appendChild(inputPassword);
	divLogin.appendChild(document.createElement('br'));
	divLogin.appendChild(buttonLogin);
	document.body.appendChild(divLogin);
	/* Create (New) Loading Screen */
	var divLoading = document.createElement('div');
	divLoading.id = 'loading';
	divLoading.className = 'classLoadingOverlay';
	document.body.appendChild(divLoading);

	if (boolNeedLogin) {
		ShowLoginScreen();
	}
	var ver = await PW_GetVersion(baseUrl);
	console.log(ver);
};


/* End Window Onload */

/* KEY FUNCTIONS */

function RefreshInterface() {
	var divWatchList = document.getElementById('divWatchlist');
	var watchlist = PW_GetWatchlist(baseUrl);
	/* NEED A FUNCTION TO PARSE WATCHLISTS INCLUDING EMPTY ONES. */
	divWatchList.appendChild(watchlist);
	/* LOTS MORE HAPPENS */
}

function InitLoginScreen() {
	var ls = document.getElementById('loginscreen');
	ls.style.display = 'block';
}

function ShowLoginScreen() {
	var ls = document.getElementById('loginscreen');
	ls.style.display = 'block';
}

function HideLoginScreen() {
	var ls = document.getElementById('loginscreen');
	ls.style.display = 'none';
}


/* Planworld Version 3.00 API Calls */

async function PW_GetVersion(localBaseUrl) {
	var localFinalUrl = localBaseUrl + '/3.00/system/version.json';
	const response = await fetch(localFinalUrl);
	return response.json();
}

async function PW_Debug_Login(localBaseUrl, localUsername, localPassword) {
	var localFinalUrl = localBaseUrl + '/3.00/debug/pseudologin/' + localUsername + '/' + localPassword + '.json';
	const response = await fetch(localFinalUrl);
	var localIntermediate = await response.json();
	return localIntermediate.pseudologin;
}

async function PW_GetWatchlist(localBaseUrl) {
	var localFinalUrl = localBaseUrl + '/3.00/watch/watchlist.json';
	const response = await fetch(localFinalUrl);
	var localIntermediate = response.json();
	return localIntermediate.watchlist;
}

async function PW_Finger(localBaseUrl, localUsername) {
	var localFinalUrl = localBaseUrl + '/3.00/plan/plan/' + localUsername + '.json';
	const response = await fetch(localFinalUrl);
	var localIntermediate = response.json();
	return localIntermediate.plan;
}

/* Attach Specific Divs to HTML 5 Sections */
function BuildInitialNav() {
	var navs = document.getElementsByTagName('nav');
	var nav = navs[0];
	nav.appendChild(CreateWatchlistContainerDiv);
	/* MORE TO COME */
}

/* Div Creation */

function CreateWatchlistContainerDiv() {
	var divWatchlistContainer = document.createElement('div');
	divWatchlistContainer.id = 'divWatchlistContainer';
	divWatchlistContainer.className = 'classContainer';
	var divWatchlistTitle = document.createElement('div');
	divWatchlistTitle.id = 'divWatchlistTitle';
	divWatchlistTitle.className = 'classTitle';
	divWatchlistTitle.innerHTML = 'Watchlist';
	var divWatchList = document.createElement('div');
	divWatchList.id = 'divWatchlist';
	divWatchList.className = 'classContent';
	divWatchlistContainer.appendChild(divWatchlistTitle);
	divWatchlistContainer.appendChild(divWatchList);
	return divWatchlistContainer;
}

function CreateFingerContainerDiv() {
	var divFingerContainer = document.createElement('div');
	divFingerContainer.id = 'divFingerContainer';
	divFingerContainer.className = 'classContainer';
	var labelFingerTitle = document.createElement('label');
	labelFingerTitle.id = 'divFingerTitle';
	labelFingerTitle.className = 'classTitle';
	labelFingerTitle.innerText = 'Finger A User';
	var inputFingerText = document.createElement('input');
	inputFingerText.setAttribute('type', 'text');
	var buttonFingerSubmit = document.createElement('button');
	buttonFingerSubmit.id = 'buttonFingerSubmit';
	buttonFingerSubmit.innerText = 'Finger';
	buttonFingerSubmit.className = 'classButton';
	buttonFingerSubmit.addEventListener('click', async function () {
		var fingerUser = document.getElementById('divFingerTitle').value;
		currentPlan = await PW_Finger(baseUrl, fingerUser);
		/* GOT TO FINISH PLACEMENT HERE */
	});
	return divFingerContainer;
}

function CreatePlanDiv

/*
Save for later -- shows how to send a form encoded in the manner expected by Planworld
async function PW_Debug_Login(localBaseUrl, localUsername, localPassword) {
	var localFinalUrl = localBaseUrl + '/3.00/debug/pseudologin/' + localUsername + '/' + localPassword + '.json';
	var formbody = new URLSearchParams();
	formbody.append('planworld_post', JSON.stringify(''));
	const response = await fetch(localFinalUrl, {
		method: 'POST',
		body: formbody,
	});
	const responsejson = await response.json();
	return await responsejson;
}*/


/**************************************************/

/* THIRD PARTY CODE BELOW (WITH LICENSES) */

/* Might have to make this part a standard library thing. 
Thanks to the hivemind at https://stackoverflow.com/questions/154059/how-can-i-check-for-an-empty-undefined-null-string-in-javascript
*/
function IsNullOrWhiteSpace(stringThing) {
	return !stringThing || 0 === stringThing.length || /^\s*$/.test(stringThing) || !stringThing.trim();
}

/* Alternate Loading Screen thanks to https://coderwall.com/p/ryargg/a-very-simple-loading-animation-in-5-lines-of-javascript and https://codepen.io/dvlden/pen/uHBpe */

function ShowLoadingScreen() {
	var el = document.getElementById('loading'),
		i = 0,
		load = setInterval(function () {
			i = ++i % 4;
			el.innerHTML =
				'<div class="classloadingtitle">UPDATING' +
				Array(i + 1).join('.') +
				'<div class="classloadingsubtitle">(Chatting with the VAX)</div></div>';
		}, 600);
	el.style.display = 'block';
}

function HideLoadingScreen() {
	var el = document.getElementById('loading');
	el.style.display = 'none';
	el.innerHTML = '';
}

