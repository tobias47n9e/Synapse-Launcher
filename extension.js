/*
 This file has been developed by Albert Palacios.
 This software may be used and distributed
 according to the terms of the GNU General Public License version 2.

 This program is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 details.

 Copyright Albert Palacios
*/

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;
const Util = imports.misc.util;

const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const Panel = imports.ui.panel;
const Tweener = imports.ui.tweener;
const GnomeSession = imports.misc.gnomeSession;

const guuid = 'SystemMenu'
const Gettext = imports.gettext.domain(guuid);
const _ = Gettext.gettext;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;


let extension;
let settingsJSON,settings,settingsID;


const extensionObject = new Lang.Class({
    Name: guuid+"."+guuid,
    Extends: PanelMenu.Button,

    _init: function() {




		let icon = new St.Icon({ icon_name: 'emblem-default-symbolic',
					 style_class: 'system-status-icon' });
		let label = new St.Label({ text: "" });
		this.parent(0.0, label.text);
		this.actor.add_actor(icon);







    this.actor.connect('button-press-event', Lang.bind(this,



      function onButtonPress() {
        var currentAction = "synapse.desktop";
      /* Save context variable for binding */
          return function() {
        let def = Shell.AppSystem.get_default();
        let app = def.lookup_app(currentAction);
        app.onButtonPress();

          }

      }

       ));










      /*    function synapse(){

              let action = 'synapse.desktop';

                return function() {

                  let def = Shell.AppSystem.get_default();
                  let app = def.lookup_app(currentAction);
                  app.activate();

                }

            }
*/




		let item = null;





    /*
    for (x in list) {

			if (list[x].type=="desktop") {
				var action = list[x].action;
				if (list[x].text=="Software Center") {
					if (settings.software!="") {
						action = settings.software;
					}
				}

				item = new PopupMenu.PopupMenuItem(_(list[x].text));
				item.connect('activate', Lang.bind(this,
					(function() {
						var currentAction = action;
						/* Save context variable for binding */
	/*					return function() {
							let def = Shell.AppSystem.get_default();
							let app = def.lookup_app(currentAction);
							app.activate();
						}
					})()
				));
				this.menu.addMenuItem(item);
			};
		};
**/


		// Remove or show "status/user" menu items



	},

	destroy: function() {
		this.parent();
	},


});

function onSettingsChanged() {

	settingsJSON = Convenience.getSettings();
	settings = JSON.parse(settingsJSON.get_string("settings-json"));

	extension.destroy();
	extension = new extensionObject();
	Main.panel.addToStatusArea(guuid, extension, settings.position, settings.area);
}

function init(metadata) {
	Convenience.initTranslations(guuid);
	settingsJSON = Convenience.getSettings();
}

function enable() {

	settings = JSON.parse(settingsJSON.get_string("settings-json"));
	settingsID = settingsJSON.connect("changed::settings-json", Lang.bind(this,onSettingsChanged));

	extension = new extensionObject();
	Main.panel.addToStatusArea(guuid, extension, settings.position, settings.area);
}

function disable() {
	settingsJSON.disconnect(settingsID);
	extension.destroy();
}
