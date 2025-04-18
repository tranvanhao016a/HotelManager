class GetAccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async execute(accountId) {
    // Logic để lấy thông tin tài khoản
    return await this.accountRepository.findById(accountId);
  }
}

module.exports = GetAccountUseCase; 