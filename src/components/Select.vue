<template>
	<div 
		class="select"
		:class="{opened}"
	>
		<div 
			class="select__picked" 
			@click="opened = !opened"
		>
			<span>{{selected}}</span>
			<img src="@/assets/img/arrow-down.svg" alt="">
		</div>
		<ul class="select__options" v-show="opened">
			<li 
				v-for="o in options"
				:key="o.id"
				:data-id="o.id"
				:data-text="o.name"
				@click="changeSelected(o.id, $event)"
			> {{o.name}}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		options: Array,
	},
	data() {
		return {
			opened: false,
			selected: this.options[0].name,
		}
	},
	methods: {
		changeSelected(id, e) {
			this.selected = e.target.dataset.text
			this.opened = false
			this.$emit('change', id)
		},
	},
	created() {
		const onClickOutside = e => this.opened = this.$el.contains(e.target) && this.opened;
		document.addEventListener('click', onClickOutside);
		this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
	},
}
</script>

<style lang="scss">
	.select {
		position: relative;
		width: 100%;

		&.opened {
			img {
				transform: rotateZ(180deg);
			}
		}
		img {
			transition: all .3s;
		}
	}
	.select__picked {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 40px;
		padding: 0 16px;
		padding-right: 18px;
		font-size: 14px;
		letter-spacing: 0.03em;
		background: #F2F2F2;

		cursor: pointer;
	}
	.select__options {
		width: 100%;
		position: absolute;
		top: 100%;
		background: #fff;
		z-index: 1;
		font-size: 14px;
		box-shadow: 0 10px 50px -30px #000;
		
		li {
			min-height: 40px;
			line-height: 40px;
			padding-left: 16px;
			cursor: pointer;

			&:hover {background: #F2F2F2;}
		}
	}
</style>