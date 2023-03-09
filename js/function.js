$(function () {
	const $loading = $('.loading')

	$loading.children('p').fadeOut()
	$loading.delay(250).fadeOut(800)

	$(window).on('load', function () {
		new WOW().init()

		$('html,body').animate({ scrollTop: 0 })
	})
})

$(function () {
	const $h1 = $('h1')
	const $home = $h1.next('#home')
	const $intro = $home.children('.intro')
	const $header = $home.nextAll('header')
	const $aside = $('aside')

	const $nav = $header.find('nav')
	const $mnu = $nav.find('a')
	const $btnGnb = $header.find('.btn-gnb')

	const arrTopVal = []
	let nowIdx = 0
	const headerH = $header.height()

	$(window).on('load resize', function () {
		$home.height(window.innerHeight)

		if (window.innerWidth > 640) {
			$h1.css({
				top: Math.round($intro.offset().top) - 72,
				marginLeft: -Math.round($h1.width() / 2),
			})

			$nav.show()
		} else {
			$h1.css({
				top: Math.round($intro.offset().top) - 100,
				marginLeft: -Math.round($h1.width() / 2),
			})
			$btnGnb.removeClass('clse')
			$nav.hide()
		}

		$('header~section').each(function (idx) {
			arrTopVal[idx] = $(this).offset().top
		})
	})

	$(window).on('scroll', function () {
		let scrollTop = Math.ceil($(this).scrollTop())
		const $aboutme = $home.nextAll('#aboutme')

		if (scrollTop > $(this).height()) {
			$header.addClass('fixed')
			$aboutme.css({
				marginTop: headerH,
			})
		} else {
			$header.removeClass('fixed')
			$aboutme.css({
				marginTop: 0,
			})
		}

		if (window.innerWidth > 640) {
			if (scrollTop > $(this).height() - 400) {
				$home.css({ transform: 'scale(0.9)' })
			} else {
				$home.css({ transform: 'scale(1)' })
			}
		}

		for (let i = 0; i < $mnu.length; i++) {
			if (scrollTop >= arrTopVal[i] - headerH - 200) {
				$mnu.eq(i).parent().addClass('on').siblings().removeClass('on')
			} else if (scrollTop < arrTopVal[0] - headerH - 200) {
				$mnu.parent().removeClass('on')
			}
		}

		const view = scrollTop + $(window).height() - $('footer').offset().top

		if (view > 0) {
			$aside.css('margin-bottom', view)
		} else {
			$aside.css('margin-bottom', 0)
		}

		if (scrollTop > 120) {
			$aside.fadeIn()
		} else {
			$aside.fadeOut()
		}
	})

	$mnu.on('click', function (evt) {
		evt.preventDefault()

		nowIdx = $mnu.index(this)
		$('html,body').animate({ scrollTop: arrTopVal[nowIdx] - headerH })

		if (window.innerWidth <= 640) {
			$btnGnb.trigger('click')
		}
	})

	$btnGnb.on('click', function () {
		$(this).toggleClass('clse')
		$nav.toggle()
	})

	$('.logo, aside').on('click', function (evt) {
		evt.preventDefault()
		$('html,body').animate({ scrollTop: 0 })
	})
})

$(function () {
	$('#ability').on('inview', function (visible) {
		if (visible) {
			$('#ability .bar').each(function () {
				$(this).width($(this).children('span').text())
			})
		}
	})

	$('.piechart').on('inview', function (visible) {
		if (visible) {
			$('.chart').easyPieChart({
				easing: 'easeInOutCubic',
				delay: 3000,
				barColor: '#68c3a3',
				trackColor: 'rgba(255,255,255,0.2)',
				scaleColor: false,
				lineWidth: 8,
				size: 140,
				animate: 2000,
				onStep: function (from, to, percent) {
					this.el.children[0].innerHTML = Math.round(percent)
				},
			})
		}
	})

	const $btnIam = $('#ability > .resume > div > .iam > a')
	const $shadow = $btnIam.next('.shadow')
	const $modal = $shadow.children('.modal')
	const $btnClse = $shadow.find('.clse')

	$btnIam.on('click', function (evt) {
		evt.preventDefault()
		$shadow.show()
	})

	$btnClse.on('click', function () {
		$shadow.hide()
	})

	$modal.on('click', function (evt) {
		evt.stopPropagation()
	})

	$shadow.on('click', function () {
		$(this).hide()
	})

	$(document).on('keyup', function (evt) {
		if (evt.which === 27) {
			$shadow.hide()
		}
	})
})

$(function () {
	const $container = $('#uxdesign > .slides > .slides-container')
	const $indicator = $('#uxdesign > .slides > .slides-pagination > li > a')
	const $btnPrev = $('#uxdesign > .slides > .slides-prev')
	const $btnNext = $('#uxdesign > .slides > .slides-next')

	let nowIdx = 0

	$indicator.on('click', function (evt) {
		evt.preventDefault()
		nowIdx = $indicator.index(this)

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')
		$container.stop().animate({ left: -(100 * nowIdx) + '%' }, 400)
	})

	$btnNext.on('click', function (evt) {
		evt.preventDefault()

		if (nowIdx < 3) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')
		$container.stop().animate({ left: '-100%' }, 400, 'easeInOutCubic', function () {
			const $slides = $('.slides-container > li')

			$slides.first().appendTo($container)
			$container.css({ left: 0 })
		})
	})

	$btnPrev.on('click', function (evt) {
		evt.preventDefault()

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 3
		}

		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')

		const $slides = $('.slides-container > li')
		$slides.last().prependTo($container)
		$container.css({ left: '-100%' })

		$container.stop().animate({ left: 0 }, 400)
	})
})

$(function () {
	const $slides = $('#portfolio > article.slides > .slides-container > figure ')
	const $indicator = $('#portfolio > article.slides > .slides-pagination > li > a')
	const $btnPrev = $('#portfolio .slides-prev')
	const $btnNext = $('#portfolio .slides-next')

	let nowIdx = 0
	let oldIdx = nowIdx

	function fadeFn() {
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')

		$slides.eq(oldIdx).stop().fadeOut(200)
		$slides.eq(nowIdx).stop().fadeIn(200).css({ display: 'flex' })
	}

	$indicator.on('click', function (evt) {
		evt.preventDefault()

		oldIdx = nowIdx
		nowIdx = $indicator.index(this)

		fadeFn()
	})

	$btnNext.on('click', function (evt) {
		evt.preventDefault()

		oldIdx = nowIdx

		if (nowIdx < 2) {
			nowIdx++
		} else {
			nowIdx = 0
		}

		fadeFn()
	})

	$btnPrev.on('click', function (evt) {
		evt.preventDefault()

		oldIdx = nowIdx

		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 2
		}

		fadeFn()
	})

	const $btnProc = $('#portfolio > article.slides a.proc')
	const $shadow = $('#portfolio > article.slides .shadow')
	const $lightbox = $shadow.children('.lightbox')
	const $btnClse = $shadow.children('.clse')

	$btnProc.on('click', function (evt) {
		evt.preventDefault()
		$shadow.eq(nowIdx).show()
	})

	$btnClse.on('click', function () {
		$shadow.hide()
	})

	$shadow.on('click', function () {
		$(this).hide()
	})

	$lightbox.on('click', function (evt) {
		evt.stopPropagation()
	})

	$(document).on('keyup', function (evt) {
		if (evt.which === 27) {
			$shadow.hide()
		}
	})
})

$(function () {
	const $tit = $('#contact > .apply > dl > dt > a')

	$tit.on('click', function (evt) {
		evt.preventDefault()

		$(this).parent().toggleClass('on').next().slideToggle(150)
	})
})
