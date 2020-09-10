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

// OLD CODE BELOW 


/* Create Div Containing Many Classrooms */
function ClassroomListToSimpleDiv(classrooms, stringIdOfDiv, stringTitleOfDiv, stringDescriptionText) {
	var divClassContainer = document.createElement('div');
	divClassContainer.id = stringIdOfDiv;
	divClassContainer.className = 'classroomContainerClass';
	var h2Title = document.createElement('h2');
	h2Title.innerText = stringTitleOfDiv;
	divClassContainer.appendChild(h2Title);
	var divDescription = document.createElement('div');
	divDescription.className = 'classDescriptionText';
	divDescription.innerText = stringDescriptionText;
	divClassContainer.appendChild(divDescription);
	classrooms.forEach(function (classroom) {
		divClassContainer.appendChild(CreateSingleClassroomDisplayDiv(classroom));
	});
	return divClassContainer;
}



function ClassroomListToSISDiv(classrooms, aliasesExisting, stringIdOfDiv, stringTitleOfDiv, stringDescriptionText) {
	var divClassContainer = document.createElement('div');
	divClassContainer.id = stringIdOfDiv;
	divClassContainer.className = 'classroomContainerClass';
	var h2Title = document.createElement('h2');
	h2Title.innerText = stringTitleOfDiv;
	divClassContainer.appendChild(h2Title);
	var divDescription = document.createElement('div');
	divDescription.className = 'classDescriptionText';
	divDescription.innerText = stringDescriptionText;
	divClassContainer.appendChild(divDescription);

	classrooms.forEach(function (classroom) {
		var divSisLongClass = document.createElement('div');
		divSisLongClass.className = 'classComplexClassroom';
		if (classroom.hasOwnProperty('name')) {
			var h3ClassTitle = document.createElement('h3');
			h3ClassTitle.innerHTML = classroom.name;
			divSisLongClass.appendChild(h3ClassTitle);
		}
		/* If this SIS class is not linked to a Google Classroom already, give the user the option to create a new Classroom linked to it. */
		if (!aliasesExisting.includes(ExtractClassId(classroom))) {
			var createButton = document.createElement('button');
			createButton.className = 'classEquallyAttractiveButton';
			createButton.innerText = 'Create this Focus SIS Class in Google Classroom';
			createButton.setAttribute('data-classid', ExtractClassId(classroom));
			createButton.addEventListener('click', async function () {
				var orClassId = this.getAttribute('data-classid');
				ShowLoadingScreen();
				//Spinner.show();
				var responseChange = await GClassCreate(baseUrl, orClassId);
				this.className = 'classSavedButton';
				if (responseChange) {
					this.innerText = 'Classroom Created (reload to see)';
				} else {
					this.innerText = 'Classroom NOT Created';
				}
				HideLoadingScreen();
				//Spinner.hide();
				return false; /* Do not submit the form. */
			});
			divSisLongClass.appendChild(createButton);
		}
		var divExpander = document.createElement('div');
		divExpander.className = 'classExpandPlaceholder';
		divExpander.setAttribute('data-classid', ExtractClassId(classroom));
		divExpander.innerHTML = 'Click to show more information about this class.';
		divExpander.addEventListener('click', async function () {
			var divToExample = document.getElementById(this.getAttribute('data-classid'));
			divToExample.style.display = 'table';
			this.style.display = 'none';
		});
		divSisLongClass.appendChild(divExpander);
		divSisLongClass.appendChild(CreateSingleClassroomDisplayDiv(classroom));
		divClassContainer.appendChild(divSisLongClass);
	});
	return divClassContainer;
}

/* An expanded version of the ClassroomListToSimpleDiv that includes form information. */
function ClassroomListWithForms(
	classrooms,
	stringIdOfDiv,
	stringTitleOfDiv,
	stringDescriptionText,
	matchClasses,
	lookupClasses,
	syncClasses
) {
	var divClassContainer = document.createElement('div');
	divClassContainer.id = stringIdOfDiv;
	divClassContainer.className = 'classroomContainerClass';
	var h2Title = document.createElement('h2');
	h2Title.innerText = stringTitleOfDiv;
	divClassContainer.appendChild(h2Title);
	var divDescription = document.createElement('div');
	divDescription.className = 'classDescriptionText';
	divDescription.innerText = stringDescriptionText;
	divClassContainer.appendChild(divDescription);

	classrooms.forEach(function (classroom) {
		var divComplexClass = document.createElement('div');
		divComplexClass.className = 'classComplexClassroom';
		var stringCurrentId = ExtractClassId(classroom);
		var boolSync = syncClasses.includes(stringCurrentId);
		var mappingKeys = ExtractClassAliases(classroom);
		if (classroom.hasOwnProperty('name')) {
			var h3ClassTitle = document.createElement('h3');
			h3ClassTitle.innerHTML = classroom.name;
			divComplexClass.appendChild(h3ClassTitle);
		}
		divComplexClass.appendChild(
			CreateClassroomChoiceFormDiv(stringCurrentId, matchClasses, lookupClasses, mappingKeys, boolSync)
		);
		var divExpander = document.createElement('div');
		divExpander.className = 'classExpandPlaceholder';
		divExpander.setAttribute('data-classid', ExtractClassId(classroom));
		divExpander.innerHTML = 'Click to show more information about this class.';
		divExpander.addEventListener('click', async function () {
			var divToExample = document.getElementById(this.getAttribute('data-classid'));
			divToExample.style.display = 'table';
			this.style.display = 'none';
		});
		divComplexClass.appendChild(divExpander);
		divComplexClass.appendChild(
			CreateSingleClassroomDisplayDiv(classroom)
		); /* We now append the class information after the form. */
		divClassContainer.appendChild(divComplexClass);
		divClassContainer.appendChild(document.createElement('HR'));
	});
	return divClassContainer;
}

// NOW WE NEED THE FUNCTION ABOVE BUT WITH MENUS SO IT NEEDS THE EXTRA INPUTS FROM THE FORM BELOW

/* Create A Menu for a Classroom as a Div */
/* Unsure as to how much SIS class information we need to provide here. 
   Starting simple, just IDs, which will go to classes below. */
function CreateClassroomChoiceFormDiv(classId, sisClasses, sisLookup, existingMappings = [], boolSync = false) {
	var divClassroomChoiceForm = document.createElement('div');
	divClassroomChoiceForm.id = classId + '-FormDiv';
	divClassroomChoiceForm.className = 'classChoiceFormDivClass';
	var formClassroomChoice = document.createElement('FORM');
	formClassroomChoice.id = classId + '-Form';
	formClassroomChoice.className = 'classChoiceFormClass';
	formClassroomChoice.setAttribute('data-classid', classId);
	formClassroomChoice.setAttribute('method', 'post');
	/* Fieldset relating to synchronization. */
	var fieldsetSyncChoice = document.createElement('FIELDSET');
	var legendSyncChoice = document.createElement('LEGEND');
	legendSyncChoice.innerText = 'Class Synchronization';
	fieldsetSyncChoice.appendChild(legendSyncChoice);
	var checkBoxSyncChoice = document.createElement('INPUT');
	checkBoxSyncChoice.id = classId + '-Sync-Checkbox';
	checkBoxSyncChoice.name = 'sync';
	checkBoxSyncChoice.setAttribute('type', 'checkbox');
	if (boolSync) {
		checkBoxSyncChoice.checked = true;
	} else {
		checkBoxSyncChoice.checked = false;
	}
	fieldsetSyncChoice.appendChild(checkBoxSyncChoice);
	var labelSyncChoice = document.createElement('LABEL');
	labelSyncChoice.innerText =
		'Check this box to automatically add students to this Google Classroom from the linked Focus SIS classes below every night. ';
	fieldsetSyncChoice.appendChild(labelSyncChoice);
	formClassroomChoice.appendChild(fieldsetSyncChoice);
	/* Fieldset relating to matching classes between Google and SIS */
	var fieldsetMappingChoice = document.createElement('FIELDSET');
	var legendMappingChoice = document.createElement('LEGEND');
	legendMappingChoice.innerText = 'Class Mapping';
	fieldsetMappingChoice.appendChild(legendMappingChoice);
	var labelMappingChoice = document.createElement('LABEL');
	labelMappingChoice.innerHTML =
		'The following Focus SIS courses will be matched to this classroom if the box next to them is checked:<br />&nbsp;';
	fieldsetMappingChoice.appendChild(labelMappingChoice);
	sisClasses.forEach(function (sisClass) {
		var labelCheckBoxMappingChoice = document.createElement('LABEL');
		var sisName = 'Unknown Class';
		if (sisLookup.hasOwnProperty(sisClass)) {
			sisName = sisLookup[sisClass];
		}
		//labelCheckBoxMappingChoice.innerHTML = sisName + "<br />( " + sisClass + " )";
		labelCheckBoxMappingChoice.innerHTML = sisName + '<br />&nbsp;';
		var checkBoxMappingChoice = document.createElement('INPUT');
		checkBoxMappingChoice.id = classId + '-SIS-' + sisClass + '-Map-Checkbox';
		checkBoxMappingChoice.name = sisClass;
		checkBoxMappingChoice.setAttribute('type', 'checkbox');
		if (existingMappings.includes(sisClass)) {
			checkBoxMappingChoice.checked = true;
		} else {
			checkBoxMappingChoice.checked = false;
		}
		fieldsetMappingChoice.appendChild(document.createElement('BR'));
		fieldsetMappingChoice.appendChild(checkBoxMappingChoice);
		fieldsetMappingChoice.appendChild(labelCheckBoxMappingChoice);
	});
	formClassroomChoice.appendChild(fieldsetMappingChoice);
	divClassroomChoiceForm.appendChild(formClassroomChoice);
	/* Save Button */
	/* Important: This button must be a direct child of the form and the inputs must have names conforming to their values. */
	var saveButton = document.createElement('BUTTON');
	saveButton.type = 'button';
	saveButton.className = 'classAttractiveButton';
	saveButton.name = classId;
	saveButton.innerHTML = 'Save Changes to this Classroom';
	saveButton.addEventListener('click', async function () {
		var boolSync = false;
		var checked = [];
		var unchecked = [];
		var googleClassId = this.name;
		var allInputs = this.parentElement.getElementsByTagName('INPUT');
		/* https://stackoverflow.com/questions/13433799/why-doesnt-nodelist-have-foreach/27024188#27024188 */
		var nodesAllInputs = Array.prototype.slice.call(allInputs, 0);
		nodesAllInputs.forEach(function (singleInput) {
			if (singleInput.name == 'sync') {
				boolSync = singleInput.checked;
			} else {
				if (singleInput.checked) {
					checked.push(singleInput.name);
				} else {
					unchecked.push(singleInput.name);
				}
			}
		});
		ShowLoadingScreen();
		//Spinner.show();
		var responseChange = await GClassChangePost(baseUrl, googleClassId, boolSync, checked, unchecked);
		if (responseChange) {
			this.className = 'classSavedButton';
			this.innerText = 'Changes Saved';
		} else {
			this.innerText = 'Changes NOT Saved';
		}
		HideLoadingScreen();
		//Spinner.hide();
		return false; /* Do not submit the form. */
	});
	var syncButtonLabel = document.createElement('LABEL');
	syncButtonLabel.className = 'classSyncLabel';
	syncButtonLabel.innerHTML =
		'Be sure to save any changes you have made (above) to this classroom before clicking the button below.';
	var syncButton = document.createElement('BUTTON');
	syncButton.type = 'button'; /* If this is not present it will try to submit. Which is bad. */
	syncButton.className = 'classOptionallyAttractiveButton';
	syncButton.name = classId + 'syncbutton';
	syncButton.setAttribute('data-classid', classId);
	syncButton.innerHTML = 'Add students from Focus / SIS class to this Google Classroom NOW';
	syncButton.addEventListener('click', async function () {
		var googleClassId = this.getAttribute('data-classid');
		ShowLoadingScreen();
		//Spinner.show();
		var responseChangeSync = await GClassAddStudentsNowGet(baseUrl, googleClassId);
		this.className = 'classSavedButton';
		if (responseChangeSync) {
			this.innerText = 'Students Added Successfully';
		} else {
			this.innerText = 'Not all students added!';
		}
		HideLoadingScreen();
		//Spinner.hide();
		return false; /* Do not submit the form. */
	});
	formClassroomChoice.appendChild(saveButton);
	formClassroomChoice.appendChild(document.createElement('BR'));
	formClassroomChoice.appendChild(syncButtonLabel);
	formClassroomChoice.appendChild(document.createElement('BR'));
	formClassroomChoice.appendChild(syncButton);
	return divClassroomChoiceForm;
}



/* Get and Receive Data from the Backend API */
async function TestGet(geturl) {
	const response = await fetch(geturl);
	return response.json();
}

async function GClassChangePost(posturl, tempClassId, tempBoolSync, tempClassesLinked, tempClassesUnlinked) {
	// OH LORD PLEASE CHANGE THIS
	var finalurl = posturl + '/postupdatelink/' + tempClassId + '/' + tempBoolSync;
	var formbody = new FormData();
	formbody.append('checked', JSON.stringify(tempClassesLinked));
	formbody.append('unchecked', JSON.stringify(tempClassesUnlinked));
	const response = await fetch(finalurl, {
		method: 'POST',
		body: formbody,
	});
	const responsejson = await response.json();
	return await responsejson;
}

async function GClassSyncList(posturl, listOfClasses) {
	var finalurl = posturl;
	var formbody = new FormData();
	formbody.append('list', JSON.stringify(listOfClasses));
	const response = await fetch(finalurl, {
		method: 'POST',
		body: formbody,
	});
	const responsejson = await response.json();
	return await responsejson;
}

async function GClassCreate(posturl, classIdToCreate) {
	var finalurl = posturl + '/create/' + classIdToCreate;
	var formbody = new FormData();
	formbody.append('nothing', JSON.stringify(''));
	const response = await fetch(finalurl, {
		method: 'POST',
		body: formbody,
	});
	const responsejson = await response.json();
	return await responsejson;
}

async function GClassAddStudentsNowGet(geturl, classIdToAddStudents) {
	var finalurl = geturl + '/getaddstudents/' + classIdToAddStudents;
	const response = await fetch(finalurl);
	return response.json();
}


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

