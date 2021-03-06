# == Schema Information
#
# Table name: items
#
#  id         :integer          not null, primary key
#  title      :string(255)      not null
#  card_id    :integer          not null
#  done       :boolean          default(FALSE)
#  created_at :datetime
#  updated_at :datetime
#

class Item < ActiveRecord::Base
  validate :not_blank
  validates :title, :card, presence: true

  belongs_to :card

  def not_blank
    return (!self.title.blank?)
  end
end
