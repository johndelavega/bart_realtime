// bart.c
//

// BART Realtime
// verson 0.11 - stable build; 
//
// 2015-09-05 v0.11 10a - bart.c variables renamed; 10b - localStorage; code cleanup
// 2015-09-04 v0.10 move xml.js to js folder, moved/renamed pebble-js-app.js to js/pebblekit-app.js
// 2015-08-31 v0.0? renamed symbol to station variable names
// 2015-08-30 v0.0? replaced Leaving with 0; sort ascending
// 2015-08-29 v0.0? added // process multiple <etd>  function john4(tag, xml, level) {
// 2015-06-26 v0.0? renamed quotes.c to bart.c, deleted antry.c/h, added version info to UI
// 2015-06-21 v0.0? fixed crash problem
// 2015-05-10 v0.0?

// original source code
// https://github.com/pebble/pebble-sdk-examples/tree/master/pebblekit-js/quotes


// https://developer.getpebble.com/


#include <pebble.h>


#define STR_APPVERSION_BUFFER "v0.11"


static Window    *window;

static TextLayer *layerStation;
static TextLayer *layerMinutes;
static TextLayer *layerAppversion;


//static char symbol[6]; //egd1 was 5 for stock symbol length
//static char price[20];

static char station[6];
static char minutes[20];

static bool wasFirstMsg;
static bool dataInited;
static int  refreshKey;
static char *refreshStation; //*refreshSymbol;


static char station1[] = "BART RT";

enum {
	BART_KEY_INIT    = 0x0,
	BART_KEY_FETCH   = 0x1,
	BART_KEY_STATION = 0x2,
	BART_KEY_MINUTES = 0x3,
};



static bool send_to_phone_multi(int bart_key, char *station) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "send_to_phone_multi(...) bart_key = %d, station = %s", bart_key, station);

	//APP_LOG(APP_LOG_LEVEL_DEBUG,  "symbol = ", symbol);

	//egd1  return false;

	if ((bart_key == -1) && (station == NULL)) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "no data to send");
		// well, the "nothing" that was sent to us was queued, anyway ...
		return true;
	}
	DictionaryIterator *iter;
	app_message_outbox_begin(&iter);
	if (iter == NULL) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "null iter1");
		return false;
	}

	Tuplet tuple = (station == NULL)
		? TupletInteger(bart_key, 1)
		: TupletCString(bart_key, station);
	dict_write_tuplet(iter, &tuple);
	dict_write_end(iter);

	APP_LOG(APP_LOG_LEVEL_DEBUG, "send_to_phone_multi(...) / app_message_outbox_send()");
	app_message_outbox_send();
	return true;
}




static void set_station_msg(char *station) {
	APP_LOG(APP_LOG_LEVEL_DEBUG, "set_station_msg(...) = %s", station);

	//    APP_LOG(APP_LOG_LEVEL_DEBUG, *symbolName );

	bool queued = send_to_phone_multi(BART_KEY_STATION, station);

	if (!queued) {
		refreshKey = BART_KEY_STATION;
		refreshStation = station; //refreshSymbol = station;
	}
}




static void in_received_handler(DictionaryIterator *iter, void *context) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "in_received_handler(...)");

	//egd1  return;

	Tuple *init_tuple = dict_find(iter, BART_KEY_INIT);
	//Tuple *symbol_tuple = dict_find(iter, QUOTE_KEY_SYMBOL);
	//Tuple *price_tuple = dict_find(iter, QUOTE_KEY_PRICE);

	Tuple *station_tuple = dict_find(iter, BART_KEY_STATION);
	Tuple *minutes_tuple = dict_find(iter, BART_KEY_MINUTES);

	//Tuple *price_tuple  = dict_find(iter, 0x1);  //egd1

	//    APP_LOG(APP_LOG_LEVEL_DEBUG, " symbol_tuple = %d, %s", symbol_tuple, symbol_tuple); 

	if (init_tuple) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "if (init_tuple)");
		// only accept one initial tuple; the second may be a server reply to
		// an out-of-date action on our part
		if (dataInited) {
			APP_LOG(APP_LOG_LEVEL_DEBUG, "if (dataInited) ");
			return;
		}
		else {
			APP_LOG(APP_LOG_LEVEL_DEBUG, "if (dataInited) else");
			dataInited = true;
		}
	}


	if (station_tuple) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "if (station_tuple)"); // JOHN
		strncpy(station, station_tuple->value->cstring, 6); //egd1 was 5
		text_layer_set_text(layerStation, station);
		APP_LOG(APP_LOG_LEVEL_DEBUG, "station = %s", station); // JOHN
	}

	if (minutes_tuple) {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "if (minutes_tuple)");
		strncpy(minutes, minutes_tuple->value->cstring, 20);
		text_layer_set_text(layerMinutes, minutes);
	}



	//egd1
	//    APP_LOG(APP_LOG_LEVEL_DEBUG, price); 
	APP_LOG(APP_LOG_LEVEL_DEBUG, "in_received_handler(...) EXIT");

	//APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 1");
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 2");
	//APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 3");
}




static void in_dropped_handler(AppMessageResult reason, void *context) {
	APP_LOG(APP_LOG_LEVEL_DEBUG, "App Message Dropped!");
}



static void out_failed_handler(DictionaryIterator *failed, AppMessageResult reason, void *context) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "out_failed_handler(...)");

	if (wasFirstMsg && dataInited) {
	}
	else {
		APP_LOG(APP_LOG_LEVEL_DEBUG, "App Message Failed to Send!");
	}
	wasFirstMsg = false;
}


static void app_message_init(void) {
	// Register message handlers
	app_message_register_inbox_received(in_received_handler);
	app_message_register_inbox_dropped(in_dropped_handler);
	app_message_register_outbox_failed(out_failed_handler);
	// Init buffers
	app_message_open(64, 64);
}



// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


static void up_click_handler(ClickRecognizerRef recognizer, void *context) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] up_click_handler(...)");

	text_layer_set_text(layerMinutes, "UP...");
	set_station_msg("PLZA"); //egd1

	// return;

}


static void down_click_handler(ClickRecognizerRef recognizer, void *context) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] down_click_handler(...)");

	text_layer_set_text(layerMinutes, "DOWN...");
	set_station_msg("DBRK"); //egd1  

	//  return;

}



// --------------------------------------------------------------------------------


static void select_click_handler(ClickRecognizerRef recognizer, void *context) {
	APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] quotes.c:select_click_handler(...)");
	//  return;

	//  set_symbol_msg("GOOG");

	// refresh
	text_layer_set_text(layerMinutes, "SELECT...");

	// this works! egd 2015-06-21
	//set_symbol_msg(symbol1); //egd1
	set_station_msg("SEL"); //egd1

	// crashes here from the watch but not from emulator
	//  send_to_phone(QUOTE_KEY_FETCH);


	//  APP_LOG(APP_LOG_LEVEL_DEBUG, "select_click_handler(...) EXIT");   
}

// --------------------------------------------------------------------------------


static void select_long_click_handler(ClickRecognizerRef recognizer, void *context) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] quotes.c:select_long_click_handler(...)");
	return;


	// refresh
	// entry_get_name(symbol, set_symbol_msg);
	text_layer_set_text(layerStation, station);
	text_layer_set_text(layerMinutes, "2-Loading...");
}


// --------------------------------------------------------------------------------

static void click_config_provider(void *context) {

	const uint16_t repeat_interval_ms = 100;
	window_single_repeating_click_subscribe(BUTTON_ID_UP, repeat_interval_ms, up_click_handler);
	window_single_repeating_click_subscribe(BUTTON_ID_DOWN, repeat_interval_ms, down_click_handler);
	window_single_click_subscribe(BUTTON_ID_SELECT, select_click_handler);
	window_long_click_subscribe(BUTTON_ID_SELECT, 0, select_long_click_handler, NULL);

}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


static void window_load(Window *window) {
	Layer *window_layer = window_get_root_layer(window);
	GRect bounds = layer_get_bounds(window_layer);

	
  // STATION
  layerStation = text_layer_create(
		(GRect) {
		.origin = { 0, 20 }, .size = { bounds.size.w, 50 }
	});
  
	//text_layer_set_text(layerStation, "AAPL"); //egd2 ADSK GOOG
	
  text_layer_set_text(layerStation, station1); //egd1
	text_layer_set_text_alignment(layerStation, GTextAlignmentCenter);
	text_layer_set_font(layerStation, fonts_get_system_font(FONT_KEY_BITHAM_42_BOLD)); //FONT_KEY_GOTHIC_28_BOLD)); // FONT_KEY_BITHAM_34_MEDIUM_NUMBERS)); // FONT_KEY_BITHAM_42_BOLD));

  layer_add_child(window_layer, text_layer_get_layer(layerStation));

	
  // MINUTES
  layerMinutes = text_layer_create(
		(GRect) {
		.origin = { 0, 75 }, .size = { bounds.size.w, 50 }
	});
	
  text_layer_set_text(layerMinutes, "0...");
	text_layer_set_text_alignment(layerMinutes, GTextAlignmentCenter);
	text_layer_set_font(layerMinutes, fonts_get_system_font(FONT_KEY_GOTHIC_28));

  layer_add_child(window_layer, text_layer_get_layer(layerMinutes));



	// APP VERSION

	layerAppversion = text_layer_create(GRect(0, 130, 144, 168));
	text_layer_set_background_color(layerAppversion, GColorClear);
	text_layer_set_text_color(layerAppversion, GColorBlack);
	text_layer_set_text(layerAppversion, STR_APPVERSION_BUFFER);
	text_layer_set_font(layerAppversion, fonts_get_system_font(FONT_KEY_GOTHIC_18)); // FONT_KEY_GOTHIC_18  FONT_KEY_GOTHIC_28  // FONT_KEY_BITHAM_34_MEDIUM_NUMBERS
	text_layer_set_text_alignment(layerAppversion, GTextAlignmentLeft);

	layer_add_child(window_get_root_layer(window), text_layer_get_layer(layerAppversion));



	// send_to_phone(QUOTE_KEY_INIT); //dbg1
	// set_symbol_msg("GOOG");

  set_station_msg(station1); //egd1
	wasFirstMsg = true;

} // static void window_load(Window *window)



static void window_unload(Window *window) {
	text_layer_destroy(layerStation);
	text_layer_destroy(layerMinutes);
}


static void init(void) {

	APP_LOG(APP_LOG_LEVEL_DEBUG, "init(...)");

	wasFirstMsg = false;
	dataInited = false;
	refreshKey = -1;
	refreshStation = NULL; //refreshSymbol = NULL;

	app_message_init();

	char entry_title[] = "Enter Symbol";
	//  entry_init(entry_title);

	window = window_create();
	window_set_click_config_provider(window, click_config_provider);
	window_set_window_handlers(window, (WindowHandlers) {
		.load = window_load,
			.unload = window_unload,
	}); // window_set_window_handlers(...)

	const bool animated = true;
	window_stack_push(window, animated);

} // static void init(void) {



static void deinit(void) {
	window_destroy(window);
}


int main(void) {
	init();

	APP_LOG(APP_LOG_LEVEL_DEBUG, "Done initializing, pushed window: %p", window);

	app_event_loop();
	deinit();
}