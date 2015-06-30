#include "pebble_process_info.h"
#include "src/resource_ids.auto.h"

const PebbleProcessInfo __pbl_app_info __attribute__ ((section (".pbl_header"))) = {
  .header = "PBLAPP",
  .struct_version = { PROCESS_INFO_CURRENT_STRUCT_VERSION_MAJOR, PROCESS_INFO_CURRENT_STRUCT_VERSION_MINOR },
  .sdk_version = { PROCESS_INFO_CURRENT_SDK_VERSION_MAJOR, PROCESS_INFO_CURRENT_SDK_VERSION_MINOR },
  .process_version = { 1, 0 },
  .load_size = 0xb6b6,
  .offset = 0xb6b6b6b6,
  .crc = 0xb6b6b6b6,
  .name = "Time for Coffee!",
  .company = "simon.jenny@me.com",
  .icon_resource_id = RESOURCE_ID_IMAGE_MENU_ICON,
  .sym_table_addr = 0xA7A7A7A7,
  .flags = 0,
  .num_reloc_entries = 0xdeadcafe,
  .uuid = { 0x58, 0xA9, 0x86, 0x97, 0x0C, 0x99, 0x48, 0x63, 0xAB, 0x10, 0x7C, 0xFE, 0x35, 0x12, 0x3B, 0x9A },
  .virtual_size = 0xb6b6
};
