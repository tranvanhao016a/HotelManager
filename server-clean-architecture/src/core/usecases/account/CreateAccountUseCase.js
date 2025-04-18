class CreateAccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountData) {
    // Logic để tạo tài khoản mới
    return await this.accountRepository.create(accountData);
  }
}

module.exports = CreateAccountUseCase; 