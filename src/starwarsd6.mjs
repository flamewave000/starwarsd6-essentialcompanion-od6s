
const MOD_NAME = 'starwarsd6-essentialcompanion-od6s';
const MENU_NAME = 'ConfigureOpenD6Options';
const PREF_STATE = 'ConfigState';

// When FoundryVTT performs its initialization phase, register or menu
Hooks.on('init', () => {
	game.settings.registerMenu(MOD_NAME, MENU_NAME, {
		restricted: true,
		name: 'starwarsd6.name',
		hint: 'starwarsd6.hint',
		label: 'starwarsd6.name',
		icon: 'fas fa-cog',
		type: ConfigureOpenD6Options
	});

	// This setting is not editable by the user. Instead it is just used to store the previous configure menu's state
	game.settings.register(MOD_NAME, PREF_STATE, {
		scope: 'world',
		config: false,
		type: Object,
		default: {}
	});
});


class ConfigureOpenD6Options extends FormApplication {
	static get defaultOptions() {
		return foundry.utils.mergeObject(FormApplication.defaultOptions, {
			template: `modules/${MOD_NAME}/templates/config.hbs`,
			resizable: false,
			minimizable: false,
			editable: true,
			submitOnChange: false,
			submitOnClose: false,
			closeOnSubmit: true,
			width: 500,
			title: game.i18n.localize("starwarsd6.name")
		});
	}

	getData(options) {
		const state = game.settings.get(MOD_NAME, PREF_STATE)
		return {
			// You can add any number of options here and they will be displayed as checkboxes in the config dialog
			options: [
				{ id: 'labels', on: state.labels ?? true, desc: 'starwarsd6.form.labels' },
				{ id: 'fields', on: state.fields ?? true, desc: 'starwarsd6.form.fields' },
				{ id: 'deadly', on: state.deadly ?? true, desc: 'starwarsd6.form.deadly' },
				{ id: 'rules', on: state.rules ?? true, desc: 'starwarsd6.form.rules' }
			]
		};
	}

	activateListeners(html) {
		html.find('button.cancel').on('click', e => { e.preventDefault(); this.close(); });
		html.find('button.submit').on('click', e => { e.preventDefault(); this.submit(); });
	}

	async _updateObject(event, formData) {
		// Save the form results so we can remember the user's previous option selections
		await game.settings.set(MOD_NAME, PREF_STATE, formData);
		// Perform the update for each option
		if (formData.labels) await this.updateLabels();
		if (formData.fields) await this.updateFields();
		if (formData.deadly) await this.updateDeadly();
		if (formData.rules) await this.updateRules();
	}

	async updateLabels() {
		await game.settings.set('od6s', 'customize_fate_points', game.i18n.localize('starwarsd6.customize_fate_points'));
		await game.settings.set('od6s', 'customize_fate_points_short', game.i18n.localize('starwarsd6.customize_fate_points_short'));
	}

	async updateFields() {
	}

	async updateDeadly() {
	}

	async updateRules() {
		await game.settings.set('od6s', 'hide_advantages_disadvantages', true);
	}

	/*

	Found using this in the console: [...game.settings.settings.entries()].map(x => [x[0], x[1].type.name]).filter(x => x[0].startsWith('od6s'))

	['od6s.auto_opposed', 'Boolean']
	['od6s.customize_fate_points', 'String']
	['od6s.customize_fate_points_short', 'String']
	['od6s.customize_use_a_fate_point', 'String']
	['od6s.custom_field_1', 'String']
	['od6s.custom_field_1_short', 'String']
	['od6s.custom_field_1_type', 'String']
	['od6s.custom_field_1_actor_types', 'Number']
	['od6s.custom_field_2', 'String']
	['od6s.custom_field_2_short', 'String']
	['od6s.custom_field_2_type', 'String']
	['od6s.custom_field_2_actor_types', 'Number']
	['od6s.custom_field_3', 'String']
	['od6s.custom_field_3_short', 'String']
	['od6s.custom_field_3_type', 'String']
	['od6s.custom_field_3_actor_types', 'Number']
	['od6s.custom_field_4', 'String']
	['od6s.custom_field_4_short', 'String']
	['od6s.custom_field_4_type', 'String']
	['od6s.custom_field_4_actor_types', 'Number']
	['od6s.customize_currency_label', 'String']
	['od6s.customize_vehicle_toughness', 'String']
	['od6s.customize_starship_toughness', 'String']
	['od6s.interstellar_drive_name', 'String']
	['od6s.customize_manifestations', 'String']
	['od6s.customize_manifestation', 'String']
	['od6s.customize_metaphysics_name', 'String']
	['od6s.customize_metaphysics_name_short', 'String']
	['od6s.customize_metaphysics_extranormal', 'String']
	['od6s.customize_metaphysics_skill_channel', 'String']
	['od6s.customize_metaphysics_skill_sense', 'String']
	['od6s.customize_metaphysics_skill_transform', 'String']
	['od6s.customize_agility_name', 'String']
	['od6s.customize_agility_name_short', 'String']
	['od6s.customize_strength_name', 'String']
	['od6s.customize_strength_name_short', 'String']
	['od6s.customize_mechanical_name', 'String']
	['od6s.customize_mechanical_name_short', 'String']
	['od6s.customize_knowledge_name', 'String']
	['od6s.customize_knowledge_name_short', 'String']
	['od6s.customize_perception_name', 'String']
	['od6s.customize_perception_name_short', 'String']
	['od6s.customize_technical_name', 'String']
	['od6s.customize_technical_name_short', 'String']
	['od6s.customize_body_points_name', 'String']
	['od6s.hide_compendia', 'Boolean']
	['od6s.deadliness', 'Number']
	['od6s.npc-deadliness', 'Number']
	['od6s.creature-deadliness', 'Number']
	['od6s.hide-skill-cards', 'Boolean']
	['od6s.hide-combat-cards', 'Boolean']
	['od6s.roll-modifiers', 'Boolean']
	['od6s.hide-gm-rolls', 'Boolean']
	['od6s.use_wild_die', 'Boolean']
	['od6s.default_wild_one', 'Number']
	['od6s.default_wild_die_one_handle', 'Number']
	['od6s.wild_die_one_face', 'String']
	['od6s.wild_die_six_face', 'String']
	['od6s.bodypoints', 'Number']
	['od6s.highhitdamage', 'Boolean']
	['od6s.hide_advantages_disadvantages', 'Boolean']
	['od6s.brawl_attribute', 'String']
	['od6s.parry_skills', 'Boolean']
	['od6s.reaction_skills', 'Boolean']
	['od6s.defense_lock', 'Boolean']
	['od6s.fate_point_round', 'Boolean']
	['od6s.fate_point_climactic', 'Boolean']
	['od6s.strength_damage', 'Boolean']
	['od6s.metaphysics_attribute_optional', 'Boolean']
	['od6s.dice_for_scale', 'Boolean']
	['od6s.sensors', 'Boolean']
	['od6s.vehicle_difficulty', 'Boolean']
	['od6s.passenger_damage_dice', 'Boolean']
	['od6s.dice_for_grenades', 'Boolean']
	['od6s.map_range_to_difficulty', 'Boolean']
	['od6s.melee_difficulty', 'Boolean']
	['od6s.cost', 'String']
	['od6s.funds_fate', 'Boolean']
	['od6s.random_hit_locations', 'Boolean']
	['od6s.pip_per_dice', 'Number']
	['od6s.flat_skills', 'Boolean']
	['od6s.default_difficulty_very_easy', 'Number']
	['od6s.default_difficulty_easy', 'Number']
	['od6s.default_difficulty_moderate', 'Number']
	['od6s.default_difficulty_difficult', 'Number']
	['od6s.default_difficulty_very_difficult', 'Number']
	['od6s.default_difficulty_heroic', 'Number']
	['od6s.default_difficulty_legendary', 'Number']
	['od6s.default_attack_difficulty', 'Number']
	['od6s.highlight_effects', 'Boolean']
	['od6s.show_skill_specialization', 'Boolean']
*/
}
