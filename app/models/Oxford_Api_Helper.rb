module OxfordApiHelper

  def definition(word)
    client = OxfordDictionary::Client.new(app_id: 'a0e32f9a', app_key: '8c26fe757416a3a6a49b077f32f15652')
    client = OxfordDictionary.new(app_id: 'a0e32f9a', app_key: '8c26fe757416a3a6a49b077f32f15652')
    return client.entry_definitions(word)
  end

end
