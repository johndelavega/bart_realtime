//#include <pebble.h>

// BART Realtime3
// verson .07
// 2015-06-26  renamed quotes.c to bart.c, deleted antry.c/h, added version info to UI
// 2015-06-21  fixed crash problem
// 2015-05-10

// original source code
// https://github.com/pebble/pebble-sdk-examples/tree/master/pebblekit-js/quotes

#include <pebble.h>

//#include "entry.h"

  
  
#define STR_APPVERSION_BUFFER "v0.07"

  
static Window    *window;

static TextLayer *symbol_layer;
static TextLayer *price_layer;
static TextLayer *appversion_layer;

static char symbol[6]; //egd1 was 5 for stock symbol length
static char price[10];
static bool wasFirstMsg;
static bool dataInited;
static int refreshKey;
static char *refreshSymbol;

static char symbol1[] = "AAPL";

enum {
  QUOTE_KEY_INIT = 0x0,
  QUOTE_KEY_FETCH = 0x1,
  QUOTE_KEY_SYMBOL = 0x2,
  QUOTE_KEY_PRICE = 0x3,
};

static bool send_to_phone_multi(int quote_key, char *symbol) {
  
  APP_LOG(APP_LOG_LEVEL_DEBUG, "send_to_phone_multi(...) quote_key = %d, symbol = %s", quote_key, symbol);
  
  //APP_LOG(APP_LOG_LEVEL_DEBUG,  "symbol = ", symbol);
  
//egd1  return false;
  
  if ((quote_key == -1) && (symbol == NULL)) {
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

  Tuplet tuple = (symbol == NULL)
                      ? TupletInteger(quote_key, 1)
                      : TupletCString(quote_key, symbol);
  dict_write_tuplet(iter, &tuple);
  dict_write_end(iter);

    APP_LOG(APP_LOG_LEVEL_DEBUG, "send_to_phone_multi(...) / app_message_outbox_send()");
  app_message_outbox_send();
  return true;
}


// NOT USED
/*

NOT USED

static void send_to_phone(int quote_key) {
    APP_LOG(APP_LOG_LEVEL_DEBUG, "send_to_phone(...)  quote_key = %d", quote_key);

  
  bool queued = send_to_phone_multi(quote_key, NULL);
  
  if (!queued && (refreshKey == -1) && (refreshSymbol == NULL)) {
    refreshKey = quote_key;
  }
}
*/


static void set_symbol_msg(char *symbolName) {
      APP_LOG(APP_LOG_LEVEL_DEBUG, "set_symbol_msg(...) = %s", symbolName );

    //    APP_LOG(APP_LOG_LEVEL_DEBUG, *symbolName );
  
  bool queued = send_to_phone_multi(QUOTE_KEY_SYMBOL, symbolName);
  
  if (!queued) {
    refreshKey = QUOTE_KEY_SYMBOL;
    refreshSymbol = symbolName;
  }
}




static void in_received_handler(DictionaryIterator *iter, void *context) {
  
    APP_LOG(APP_LOG_LEVEL_DEBUG, "in_received_handler(...)");
  
//egd1  return;
  
  Tuple *init_tuple   = dict_find(iter, QUOTE_KEY_INIT);
  Tuple *symbol_tuple = dict_find(iter, QUOTE_KEY_SYMBOL);
  Tuple *price_tuple  = dict_find(iter, QUOTE_KEY_PRICE);
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
  
  if (symbol_tuple) {
    APP_LOG(APP_LOG_LEVEL_DEBUG, "if (symbol_tuple)"); // JOHN
    strncpy(symbol, symbol_tuple->value->cstring, 6); //egd1 was 5
    text_layer_set_text(symbol_layer, symbol);
  }
 
  if (price_tuple) {
    APP_LOG(APP_LOG_LEVEL_DEBUG, "if (price_tuple)"); 
    strncpy(price, price_tuple->value->cstring, 10);
    text_layer_set_text(price_layer, price);
  }
 
  
//  text_layer_set_text(price_layer, "$002.00");
  
  
  //egd1
 //    APP_LOG(APP_LOG_LEVEL_DEBUG, price); 
  APP_LOG(APP_LOG_LEVEL_DEBUG, "in_received_handler(...) EXIT"); 
  
    APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 1"); 
    APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 2"); 
    APP_LOG(APP_LOG_LEVEL_DEBUG, "padding 3"); 
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


static void up_click_handler(ClickRecognizerRef recognizer, void *context) {
 
  APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] up_click_handler(...)");

    text_layer_set_text(price_layer, "UP...");
    set_symbol_msg("UP"); //egd1
  
 // return;
  
}


static void down_click_handler(ClickRecognizerRef recognizer, void *context) {
 
  APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] down_click_handler(...)");

    text_layer_set_text(price_layer, "DOWN...");
    set_symbol_msg("DOWN"); //egd1  
  
//  return;
  
}



// --------------------------------------------------------------------------------


static void select_click_handler(ClickRecognizerRef recognizer, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "[BUTTON] quotes.c:select_click_handler(...)"); 
//  return;
  
 //  set_symbol_msg("GOOG");
  
  // refresh
  text_layer_set_text(price_layer, "1-Loading...");
 
  // this works! egd 2015-06-21
  //set_symbol_msg(symbol1); //egd1
  set_symbol_msg("SEL"); //egd1
  
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
  text_layer_set_text(symbol_layer, symbol);
  text_layer_set_text(price_layer, "2-Loading...");
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

  symbol_layer = text_layer_create(
      (GRect) { .origin = { 0, 20 }, .size = { bounds.size.w, 50 } });
  //text_layer_set_text(symbol_layer, "AAPL"); //egd2 ADSK GOOG
  text_layer_set_text(symbol_layer, symbol1); //egd1
  text_layer_set_text_alignment(symbol_layer, GTextAlignmentCenter);
  text_layer_set_font(symbol_layer, fonts_get_system_font(FONT_KEY_BITHAM_42_BOLD)); //FONT_KEY_GOTHIC_28_BOLD)); // FONT_KEY_BITHAM_34_MEDIUM_NUMBERS)); // FONT_KEY_BITHAM_42_BOLD));
  layer_add_child(window_layer, text_layer_get_layer(symbol_layer));

  price_layer = text_layer_create(
      (GRect) { .origin = { 0, 75 }, .size = { bounds.size.w, 50 } });
  text_layer_set_text(price_layer, "$0000.00");
  text_layer_set_text_alignment(price_layer, GTextAlignmentCenter);
  text_layer_set_font(price_layer, fonts_get_system_font(FONT_KEY_GOTHIC_28));
  layer_add_child(window_layer, text_layer_get_layer(price_layer));

  

  // Create time TextLayer APPVERSION
  
  appversion_layer = text_layer_create(GRect(0, 130, 144, 168));
  text_layer_set_background_color(appversion_layer, GColorClear);
  text_layer_set_text_color(appversion_layer, GColorBlack);
  text_layer_set_text(appversion_layer, STR_APPVERSION_BUFFER);
  text_layer_set_font(appversion_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18)); // FONT_KEY_GOTHIC_18  FONT_KEY_GOTHIC_28  // FONT_KEY_BITHAM_34_MEDIUM_NUMBERS
  text_layer_set_text_alignment(appversion_layer, GTextAlignmentLeft);
  
  layer_add_child(window_get_root_layer(window), text_layer_get_layer(appversion_layer));

  
  
  
  
 // send_to_phone(QUOTE_KEY_INIT); //dbg1
 // set_symbol_msg("GOOG");
   set_symbol_msg(symbol1); //egd1
  wasFirstMsg = true;
}


static void window_unload(Window *window) {
  text_layer_destroy(symbol_layer);
  text_layer_destroy(price_layer);
}


static void init(void) {
  
      APP_LOG(APP_LOG_LEVEL_DEBUG, "init(...)");
  
  wasFirstMsg = false;
  dataInited = false;
  refreshKey = -1;
  refreshSymbol = NULL;

  app_message_init();

  char entry_title[] = "Enter Symbol";
//  entry_init(entry_title);

  window = window_create();
  window_set_click_config_provider(window, click_config_provider);
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload,
  });

  const bool animated = true;
  window_stack_push(window, animated);
}


static void deinit(void) {
  window_destroy(window);
}


int main(void) {
  init();

  APP_LOG(APP_LOG_LEVEL_DEBUG, "Done initializing, pushed window: %p", window);

  app_event_loop();
  deinit();
}