class AddUrlAliasToChapter < ActiveRecord::Migration[5.2]
  def change
    add_column :chapters, :url_alias, :string
  end
end
