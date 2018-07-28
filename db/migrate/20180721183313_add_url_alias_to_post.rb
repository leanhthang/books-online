class AddUrlAliasToPost < ActiveRecord::Migration[5.2]
  def change
    add_column :posts, :url_alias, :string
  end
end
