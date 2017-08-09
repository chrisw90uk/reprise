app.controller('signUpCtrl', signUpCtrl);

function signUpCtrl($http, $timeout, status){
	var vm = this;
	vm.signUp = signUp;
	vm.details = {
		username: '',
		email: ''
	};

	//validation

	vm.submitted = false;
	vm.validated = false;
	vm.emailValid;

	function activate(){
		console.log("hello world");
	}

	activate();

	//validation

	function signUp(){
		console.log(vm.details);
	}
	
}