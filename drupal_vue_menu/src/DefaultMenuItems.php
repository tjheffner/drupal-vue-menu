<?php

namespace Drupal\drupal_vue_menu;

use Drupal\menu_link_content\Entity\MenuLinkContent;

/**
 * Class DefaultMenuItems.
 *
 * @package Drupal\drupal_vue_menu
 */
class DefaultMenuItems {

  /**
   * Static method create.
   *
   * @param array $items
   *   Items to be added to a menu, possibly with parents. Each item should
   *   be an array in the format of:
   *    'menu_item' = array(
   *      'title' => 'item_name',
   *      'link' => '/link',
   *    ).
   * @param string $menu
   *   The machine name of the menu where items should be created.
   */
  public static function create(array $items, $menu = NULL) {
    foreach ($items as $item) {
      $parent = "";

      MenuLinkContent::create([
        'title' => $item['title'],
        'link' => ['uri' => 'internal:' . $item['link']],
        'menu_name' => $menu,
        'parent' => $parent,
      ])->save();
    }
  }

}
