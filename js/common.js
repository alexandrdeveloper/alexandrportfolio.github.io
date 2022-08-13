document.addEventListener('DOMContentLoaded', () => {

	const filterButtons = document.querySelectorAll('.b-portfolio--filter__button');
	const portfolioGrid = document.querySelector('.b-portfolio-row');
	let bPage = document.querySelector('.b-page');
	let modal = document.querySelector('.project-modal');

	filterButtons.forEach((button, index) => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			filterButtons.forEach((b, i) => {
				if (b.classList.contains('b-portfolio--filter__button_active')) {
					b.classList.remove('b-portfolio--filter__button_active');
				}
				
			});
			this.classList.add('b-portfolio--filter__button_active');
		});
	});

	

	function openModal(projectNum) {
		
		
		bPage.classList.add('b-page_noscroll');
		modal.classList.remove('project-modal_hidden');
		modal.style.display = 'block';		
		modal.classList.add('project-modal_active');

		let name = modal.querySelector('.project-content__title');
		let image = modal.querySelector('.project-modal--window__image').querySelector('img');
		let description = modal.querySelector('.project-content__description');
		let modalText = modal.querySelector('.project-content');
		let preloader = modal.querySelector('.project-modal__preloader');
		preloader.style.display = 'flex';
		preloader.classList.remove('project-modal__preloader_hidden');				

		fetch('js/DATA.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let project = data[`project${projectNum}`];
			image.setAttribute('src', project.imageUrl);
			name.textContent = project.name;
			description.textContent = project.description;
			
			let pageList = document.createElement("ul");
			
			pageList.classList.add('pagelist');
			modalText.append(pageList);
			 
			for (let key in project.pages) {
				let pageListItem = document.createElement('li');
				pageListItem.classList.add('pagelist__item');
				pageListItem.innerHTML = `
					<a href="${project.pages[key]}">${key}</a>
				`;
				pageList.append(pageListItem);

			}
		})
		.finally(() => {
			preloader.classList.add('project-modal__preloader_hidden');
			setTimeout(() => {
				preloader.style.display = 'none';
			});
		});

		
	}

	function closeModal() {
		let modal = document.querySelector('.project-modal');

		modal.classList.remove('project-modal_active');		
		modal.classList.add('project-modal_hidden');
		setTimeout(() => {
			modal.style.display = 'none';
			bPage.classList.remove('b-page_noscroll');
		}, 500);
		document.querySelector('.pagelist').remove();
		let name = modal.querySelector('.project-content__title');
		let image = modal.querySelector('.project-modal--window__image').querySelector('img');
		let description = modal.querySelector('.project-content__description');

		name.textContent = '';
		image.setAttribute('src' ,'');
		description.textContent = '';

	}

	let modalCloseBtn = document.querySelector('.project-modal__close');
	modalCloseBtn.addEventListener('click', (e) => {
		e.preventDefault();
		closeModal();
	} );

	document.addEventListener('click', (e) => {
		let target = e.target;
		let modalWindow = modal.querySelector('project-modal--window');
		const modal_is_active = modal.classList.contains('project-modal_active');
		if (target === modal && modal_is_active && target !== modalWindow) {
			closeModal();
		}
		

	});

	fetch('js/DATA.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let projectList = data;
			for (let key in projectList) {
				let projectBox = document.createElement('div');
				projectBox.classList.add('col-lg-3', 'col-sm-6', 'b-portfolio--content__item', 'mix', `${projectList[key].sortKey}`);

				projectBox.innerHTML = `
				<a href="#" class="b-portfolio-box">
					<div class="b-portfolio-box__thumbnail">
						<img src="${projectList[key].thumbnailUrl}" alt="${projectList[key].name}">
					</div>
					<!-- /.b-portfolio-box__thumbnail -->
					<div class="b-portfolio-box__info">
						<span class="b-portfolio-box__category">${projectList[key].category}</span>
						<!-- /.b-portfolio-box__category -->
						<span class="b-portfolio-box__name">${projectList[key].name}</span>
						<!-- /.b-portfolio-box__name -->
						<button class="b-portfolio-box__view"><i class='bx bx-zoom-in' ></i></button>

					</div>
					<!-- /.b-portfolio-box__info -->
				</a>
				<!-- /.b-portfolio-box -->
				`;

				portfolioGrid.append(projectBox);
			}
		})
		.then(() => {
			let mixer = mixitup('.b-portfolio-row', {
				animation: {
					duration: 300,
				}
			});
		})
		.then(() => {
			let portfolioBox = document.querySelectorAll('.b-portfolio--content__item');
			portfolioBox.forEach((item, index) => {
				item.addEventListener('click', (e) =>{
					e.preventDefault();
					openModal(index);
		
				});
			});
		});


		const navbar = document.querySelector('.b-header');
		const buttonUp = document.querySelector('.page-up');

		window.addEventListener('scroll', () => {
			if(window.pageYOffset > 50) {
				navbar.classList.add('b-header_scrolled');
				buttonUp.classList.add('page-up_visible');
			} else {
				navbar.classList.remove('b-header_scrolled');
				buttonUp.classList.remove('page-up_visible');
			}
			
		});

		const pagePreloader = document.querySelector('.b-page--preloader');

		function hidePreloader(preloader) {
			setTimeout(() => {
				preloader.classList.add('b-page--preloader_hidden');
				setTimeout(() => {
					preloader.style.display = 'none';
				}, 1000);
			}, 1000);
			
		}

		hidePreloader(pagePreloader);

		const burger = document.querySelector('.b-burger');
		const menu = document.querySelector('.b-menu');
		const headerSocial = document.querySelector('.b-social');


		const toggleMenu = () => {
			if (!menu.classList.contains('b-menu_opened')) {
				menu.classList.add('b-menu_opened');
				headerSocial.classList.add('b-social_visible');
				console.log('open menu');
			} else {
				menu.classList.remove('b-menu_opened');
				headerSocial.classList.remove('b-social_visible');
				console.log('close menu');
			}

		};

		

		burger.addEventListener('click', (e) => {
			e.preventDefault();
			
			if (!burger.classList.contains('b-burger_clicked')) {
				burger.classList.add('b-burger_clicked');
				toggleMenu();
			} else {
				burger.classList.remove('b-burger_clicked');
				toggleMenu();
			}		 
			
		});

		document.addEventListener('click', (e) => {
			let target = e.target;
			let is_menu = target === menu || menu.contains(target);
			let is_burger = target === burger || burger.contains(target);
			let menu_is_opened = menu.classList.contains('b-menu_opened');
			let burger_is_active = burger.classList.contains('b-burger_clicked');

			if (!is_menu && !is_burger && menu_is_opened && burger_is_active) {
				burger.classList.remove('b-burger_clicked');
				toggleMenu();
			}

		});

	
		function smoothScroll(targetSection, duration) {
			let target = document.querySelector(targetSection);
			let targetPosition = target.getBoundingClientRect().top;
			let startPosition = window.pageYOffset;
			
			let distance = targetPosition - startPosition;
			let startTime = null;
	
			function animationScroll(currentTime){
				if (startTime === null) {
					startTime = currentTime;								
				}

				let timeElapsed = currentTime - startTime;
				let run = ease(timeElapsed, startPosition, distance, duration);		
				
				window.scrollTo(0, run);
				if (timeElapsed < duration) {
					requestAnimationFrame(animationScroll);
				}
			}
	
			function ease(t, b, c, d) {
				t /= d/2;
				if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
				t--;
				return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
			}		
	
			requestAnimationFrame(animationScroll);
	
		}

		const smoothScrollLink = document.querySelectorAll('.smooth-scroll');

		const easeInCubic = function (t) { return t*t*t }
 
		const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
		const runtime = currentTime - startTime;
		let progress = runtime / duration;
		
		progress = Math.min(progress, 1);
		
		const ease = easeInCubic(progress);
		
		window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));
		if(runtime < duration){
			requestAnimationFrame((timestamp) => {
			const currentTime = timestamp || new Date().getTime();
			scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
			});
		}
		};

		smoothScrollLink.forEach(item => {
			item.addEventListener('click', function(e) {
				e.preventDefault();
				const scrollElemId = this.getAttribute('href');
				const scrollEndElem = document.querySelector(scrollElemId);

				if (menu.classList.contains('b-menu_opened')) {
					menu.classList.remove('b-menu_opened');
					headerSocial.classList.remove('b-social_visible');
					burger.classList.remove('b-burger_clicked');
				}

				const anim = requestAnimationFrame((timestamp) => {
					const stamp = timestamp || new Date().getTime();
					const duration = 1200;
					const start = stamp;
				 
					const startScrollOffset = window.pageYOffset;
					const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top;
				 
					scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
				});
			});
		});

		let menuLink = document.querySelectorAll('.b-menu__link');
		let section = document.querySelectorAll('.nav-switch');

		window.addEventListener('scroll', () => {
			const scrollY = window.pageYOffset;
			section.forEach(current => {
				const sectionHeight = current.offsetHeight;
				const sectionTop = current.offsetTop - 200;
				const sectionId = current.getAttribute('id');
				console.log(sectionId);
				if (scrollY > sectionTop && scrollY < sectionTop + sectionHeight) {
					document
						.querySelector(`.b-menu__link[href*=${sectionId} ]`)
						.classList.add('b-menu__link_active');
				} else {
					menuLink.forEach(item => {
						document
							.querySelector(`.b-menu__link[href*=${sectionId} ]`)
							.classList.remove('b-menu__link_active');
					});
				}

			});
		});


	// class GradientAnimation{
	// 	constructor() {
	// 		this.cnv = document.querySelector('canvas');
	// 		this.ctx = this.cnv.getContext('2d');

	// 		this.circlesNum = 20;
	// 		this.speed = .005;
	// 		this.minRadius = 400;
	// 		this.maxRadius = 800;

	// 		this.setCanvasSize();
	// 		this.createCircles();
	// 		this.drawAnimation();
	// 		window.onresize = () => {
	// 			this.setCanvasSize();
	// 			this.createCircles();
				

	// 		}
	// 	}
	// 	setCanvasSize() {
	// 		this.w = this.cnv.width = innerWidth;
	// 		this.h = this.cnv.height = innerHeight;
	// 	}
	// 	createCircles() {
	// 		this.circles = [];
	// 		for (let i = 0; i < this.circlesNum; i++){
	// 			this.circles.push(new Circle(this.w, this.h, this.minRadius, this.maxRadius));
	// 		}
			
	// 	}

	// 	drawCircles() {
	// 		this.circles.forEach(circle => circle.draw(this.ctx, this.speed));
	// 	}

	// 	clearCanvas() {
	// 		this.ctx.clearRect(0, 0, this.w, this.h);
	// 	}

	// 	drawAnimation() {
	// 		this.clearCanvas();
	// 		this.drawCircles();
	// 		window.requestAnimationFrame(() => this.drawAnimation());
	// 	}

	
	// }

	// class Circle{
	// 	constructor(w, h, minR, maxR) {
	// 		this.x = Math.random() * w;
	// 		this.y = Math.random() * h;
	// 		this.angle = Math.random() * 2 * Math.PI;
	// 		this.radius = Math.random() * (maxR - minR) + minR;
	// 		this.firstColor = `hsla(${Math.random() * 0}, 0%, 0%, 1)`;
	// 		this.secondColor = `hsla(${Math.random() * 360}, 100%, 50%, 0)`;
	// 	}
	// 	draw(ctx, speed){
	// 		this.angle += speed;

	// 		const x = this.x + Math.cos(this.angle) * 200;
	// 		const y = this.y + Math.sin(this.angle) * 200;
	// 		const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);

	// 		gradient.addColorStop(0, this.firstColor);
	// 		gradient.addColorStop(1, this.secondColor);

	// 		ctx.globalCompositeOperation = 'overlay';
	// 		ctx.fillStyle = gradient;
	// 		ctx.beginPath();
	// 		ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
	// 		ctx.fill();
	// 	}
	// }

	// window.onload = () => {
	// 	new GradientAnimation();
	// } 
		

		

		
		
		

		

		

		

		

	

});
