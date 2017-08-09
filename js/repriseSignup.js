app.controller('signUpCtrl', signUpCtrl);

function signUpCtrl($http, $timeout, status){
	var vm = this;
	vm.signUp = signUp;
	vm.details = {
		username: '',
		email: ''
	};
	
	//validation
	vm.pwdMatch = pwdMatch;
	vm.submitted = false;
	vm.validated = false;

	function activate(){
		console.log("hello world");
	}

	activate();

	
	//validation

	function pwdMatch(){
		if(vm.details.pwd === vm.details.pwdchk){
			vm.validated = true;
			return true;
		}else{
			vm.validated = false;
			return false;
		}
	}

	//submit

	function signUp(){
		if(vm.validated){
			console.log(vm.details);
		}
	}
	
}